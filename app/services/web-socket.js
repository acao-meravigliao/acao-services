
import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {

  reconnectDelayConstant: 500,
  reconnectBackoff: 2.0,
  reconnectLimit: 15000,

  pingFrequency: 5000,
  pingTimeout: 5000,

  store: Ember.inject.service('store'),

  init() {
    let me = this;

    this._super(...arguments);

    me.uri = (window.location.protocol == 'http:' ? 'ws://' : 'wss://') + window.location.hostname + '/ws';
    me.uri = 'ws://linobis.acao.it:3100/ws';

    me.state = 'DISCONNECTED';
    me.reconnectAttempt = 0;
    me.pingTimer = null;
    me.pingTimeoutTimer = null;

    me.collectionBindings = {};
    me.requests = {};
    me.deferredRequests = [];
    me.currentRequestId = 0;

    document.addEventListener("visibilitychange", function() {
      switch(me.state) {
      case 'READY':
        if (document.visibilityState == 'visible') {
          me.startPing();
          me.transmit({
            type: 'awake',
          });
        } else {
          me.stopPing();
          me.transmit({
            type: 'idle',
          });
        }
      break;

      case 'INVISIBLE_IDLE':
        me.connect();
      }
    });

    me.connect();
  },

  startPing() {
    let me = this;

    me.pingTimer = Ember.run.later(me, me.doPing, me.pingFrequency);
  },

  stopPing() {
    let me = this;

    Ember.run.cancel(me.pingTimer);
    me.pingTimer = null;

    if (me.pingTimeoutTimer) {
      Ember.run.cancel(me.pingTimeoutTimer);
      me.pingTimeoutTimer = null;
    }
  },

  doPing() {
    let me = this;

    me.transmit({
      type: 'ping',
      request_id: me.pickRequestId(),
    });

    me.pingTimeoutTimer = Ember.run.later(me, function() {
      me.socket.close();
    }, me.pingTimeout);
  },

  transmit(msg) {
    let me = this;

    console.log("MSG >>>", msg);

    me.socket.send(JSON.stringify(msg));
  },

  connect() {
    let me = this;

    if (me.state != 'DISCONNECTED')
      return;

    me.changeState('CONNECTING');

    me.doConnect();
  },

  doConnect() {
    let me = this;

    me.lastAttempt = Date.now();
    me.socket = new WebSocket(me.uri);

    me.socket.onopen = function(/*ev*/) {
      me.reconnectAttempt = 0;
      me.changeState('OPEN_WAIT_WELCOME');
    };

    me.socket.onmessage = function (ev) {
      let msg = JSON.parse(ev.data)

      me.onMessage(msg);
    };

    me.socket.onerror = function (ev) {
      me.trigger('error', ev);
      console.log("ONERROR", ev);
    };

    me.socket.onclose = function (ev) {

      me.offlineReason = 'Websocket closed';

      // MAKE THOSE FAIL???
      me.requests = {};

      if (!me.savedCollectionBindings) {
        me.savedCollectionBindings = me.collectionBindings;
        me.collectionBindings = {};
  console.log("COLLECTION BINDINGS SAVED", me.collectionBindings, me.savedCollectionBindings);
      }

      me.trigger('close', ev);
      me.trigger('offline', me.offlineReason);

      me.stopPing();

      console.log("CLOSE", ev);

      me.reconnectAttempt += 1;

      if (document.visibilityState == 'visible') {
        if (me.reconnectAttempt == 1) {
          me.changeState('RECONNECTING');
          me.doConnect();
        } else {
          me.waitStart = Date.now();
          me.delay = Math.min((Math.pow(me.reconnectBackoff, me.reconnectAttempt - 1) - 1) *
                                         me.reconnectDelayConstant, me.reconnectLimit);

          console.log("RECONNECTING IN", me.delay);

          me.changeState('RECONNECT_WAIT');

          Ember.run.later(me, function() {
            me.changeState('RECONNECTING');
            me.doConnect();
          }, me.delay);
        }
      } else {
        me.changeState('INVISIBLE_IDLE');
      }
    };
  },

  onMessage: function(msg) {
    let me = this;

console.log("MSG <<<", msg);

    switch(msg.type) {
    case 'welcome':
console.log("WELCOME", msg);
      me.trigger('welcome', msg);

      if (!me.app_version)
        me.app_version = msg.app_version;

      if (me.app_version != msg.app_version)
        me.trigger('version_mismatch', me.app_version, msg.app_version);

      if (me.state == 'OPEN_WAIT_WELCOME') {
        let regexp = /acao-services\/models\/(.*)$/;

        Object.keys(require._eak_seen).filter((name) => regexp.test(name)).
                     map((name) => regexp.exec(name)[1]).forEach(function(modelType) {

          let models = me.get('store').peekAll(modelType);
          let ids = models.map((model) => model.get('id'));

          if (ids.length > 0)
            me.getAndBind(modelType, ids);
        });

        if (me.savedCollectionBindings) {
console.log("RESUBSCRIBING", me.savedCollectionBindings);

          $.each(me.savedCollectionBindings, function(binding) {
            me.getAndBind(binding, null);
          });

          me.savedCollectionBindings = null;
        }

        if (!msg.online) {
          me.offlineReason = msg.offline_reason;
          me.changeState('READY_OFFLINE');
          me.trigger('offline', me.offlineReason);
        } else {
          me.changeState('READY');
          me.trigger('online');
          me.flushDeferredRequests();
        }

        me.startPing();
      }
    break;

    case 'online':
      me.changeState('READY');
      me.trigger('online');
      me.flushDeferredRequests();
    break;

    case 'offline':
      me.offlineReason = msg.offline_reason;
      me.changeState('READY_OFFLINE');
      me.trigger('offline', me.offlineReason);
    break;

    case 'ping':
      me.transmit({
        type: 'pong',
      });
    break;

    case 'pong':
      Ember.run.cancel(me.pingTimeoutTimer);
    break;

    case 'bind_ok':
console.log("BIND_OK");
      let req = me.requests[msg.reply_to];
      if (req) {

        if (msg.code == 200)
          req.success(msg);
        else
          req.failure(msg);

        delete me.requests[msg.reply_to];
      } else {
        console.log('bind_ok for unknown request');
      }
    break;

    case 'create':
      me.get('store').pushPayload(msg.data);
    break;

    case 'update':
      me.get('store').pushPayload(msg.data);
    break;

    case 'delete':
      let model = me.get('store').peekRecord(msg.model, msg.id);

      // XXX Send didDelete event??

      if (model)
        model.unloadRecord();

    break;

    case 'msg':
      me.trigger('rawmsg', msg);

//      Ext.Array.each(msg.binding_ids, function(binding_id) {
//        let binding = me.bindings[binding_id];
//        if (binding)
//          binding.onMessage.call(binding.scope, msg, binding);
//        else
//          console.warn("Received message from exchange", msg.exchange, "on unexistant binding", binding_id);
//      });

    break;
    }
  },

  changeState(newState) {
    let me = this;

    console.log('WS', me.uri, 'Changed state from', me.state, 'to', newState);

    me.set('state', newState);
  },

  pickRequestId: function() {
    return this.currentRequestId++;
  },

  getAndBind(modelName, ids) {
    let me = this;

    me.connect();

console.log("GET_AND_BIND", modelName, ids);

    let defer = Ember.RSVP.defer();

    let req = {
      method: 'bind',
      modelName: modelName,
      modelIds: ids,
      success: function(msg) {
        me.collectionBindings[modelName] = true;

        defer.resolve(msg.data);
      },
      failure: function(msg) {
        defer.reject(msg.code);
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  makeRequest(req) {
    let me = this;

    switch(me.state) {
    case 'CONNECTING':
    case 'OPEN_WAIT_WELCOME':
    case 'RECONNECTING':
    case 'INVISIBLE_IDLE':
      me.deferredRequests.push(req);
    break;

    case 'READY':
      me.transmitRequest(req);
    break;

    case 'RECONNECT_WAIT':
    case 'READY_OFFLINE':
      req.defer.promise.reject();
    break;
    }
  },

  transmitRequest(req) {
    let me = this;

    req.id = me.pickRequestId();

    me.requests[req.id] = req;

    me.transmit({
      type: req.method,
      request_id: req.id,
      model: req.modelName,
      ids: req.modelIds,
    });
  },

  flushDeferredRequests() {
    let me = this;

    me.deferredRequests.forEach(function(req) {
      me.transmitRequest(req);
    });

    me.deferredRequests = [];
  },
});
