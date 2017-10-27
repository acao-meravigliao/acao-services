
import Ember from 'ember';
import config from '../config/environment';

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

    me.uri = (window.location.protocol == 'http:' ? 'ws://' : 'wss://') + window.location.host + '/ws';

    me.state = 'DISCONNECTED';
    me.reconnectAttempt = 0;
    me.pingTimer = null;
    me.pingTimeoutTimer = null;

    me.collectionBindings = {};
    me.requests = {};
    me.deferredRequests = [];
    me.currentRequestId = 0;

    me.subs = {};

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

    //me.connect();
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

    //console.log("MSG >>>", msg);

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
      me.onClose(ev);
    };
  },

  onMessage: function(msg) {
    let me = this;

    //console.log("MSG <<<", msg);

    switch(msg.type) {
    case 'welcome':
console.log("WELCOME", msg);
      me.trigger('welcome', msg);

      if (!me.app_version)
        me.app_version = msg.app_version;

      if (me.app_version != msg.app_version)
        me.trigger('version_mismatch', me.app_version, msg.app_version);

      if (me.state == 'OPEN_WAIT_WELCOME') {
        let regexp = new RegExp(config.modulePrefix + '/models/(.*)$');

        Object.keys(require._eak_seen).filter((name) => regexp.test(name)).
                     map((name) => regexp.exec(name)[1]).forEach(function(modelType) {

          let models = me.get('store').peekAll(modelType);

          let ids = [];
          models.forEach(function(model) {
            if (model.get('isLoaded'))
              ids.push(model.get('id'));
          });

          if (ids.length > 0)
            me.getAndBind(modelType, ids);
        });

        if (me.savedCollectionBindings) {
console.log("RESUBSCRIBING", me.savedCollectionBindings);

          me.savedCollectionBindings.forEach(function(binding) {
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

    case 'bind_ok': {
      let req = me.requests[msg.reply_to];
      if (!req) {
        console.log('bind_ok for unknown request');
        return;
      }

console.log("BIND_OK",req.params, msg.payload.data);

      delete me.requests[msg.reply_to];

      req.success(msg);
    }
    break;

    case 'bind_fail': {
      let req = me.requests[msg.reply_to];
      if (!req) {
        console.log('bind_fail for unknown request');
        return;
      }

console.log("BIND_FAIL", msg, "REQ=", req);

      delete me.requests[msg.reply_to];

      req.failure(msg);
    }
    break;

    case 'sub_ok': {
console.log("SUB_OK", msg);
      let req = me.requests[msg.reply_to];
      if (!req) {
        console.log('sub_ok for unknown request');
        return;
      }

      delete me.requests[msg.reply_to];

      req.success(msg);
    }
    break;

    case 'sub_fail': {
console.log("SUB_FAIL", msg);
      var req = me.requests[msg.reply_to];
      if (!req) {
        console.log('sub_fail for unknown request');
        return;
      }

      delete me.requests[msg.reply_to];

      req.failure(msg);
    }
    break;

    case 'create':
      me.get('store').pushPayload(msg.data);
    break;

    case 'update':
      me.get('store').pushPayload(msg.data);
    break;

    case 'delete': {
      let model = me.get('store').peekRecord(msg.model, msg.id);

      // XXX Send didDelete event??

      if (model)
        model.unloadRecord();
    }
    break;

    case 'msg':
      me.trigger('rawmsg', msg);

      msg.sub_ids.forEach(function(sub_id) {
        let sub = me.subs[sub_id];
        if (sub)
          sub.onMessage.call(sub.scope, msg, sub);
        else
          console.warn("Received message from exchange", msg.exchange, "on unexistant sub", sub_id);
      });

    break;
    }
  },

  onClose(ev) {
    var me = this;

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
  },

  changeState(newState) {
    let me = this;

    console.log('WS', me.uri, 'Changed state from', me.state, 'to', newState);

    me.set('state', newState);
  },

  pickRequestId: function() {
    return this.currentRequestId++;
  },

  getAndBind(modelName, ids, params) {
    let me = this;

console.log("GET_AND_BIND", modelName, ids);

    let defer = Ember.RSVP.defer();

    let req = {
      method: 'bind',
      params: Ember.merge({
        model: modelName,
        ids: ids,
      }, params),
      success: function(msg) {
        me.collectionBindings[modelName] = true;
        defer.resolve(msg.payload);
      },
      failure: function(msg) {
        defer.reject(msg.reason);
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  subscribe(exchange, cb, scope) {
console.log("SUBSCRIBE", arguments);

    let me = this;

    let defer = Ember.RSVP.defer();

    let req = {
      method: 'sub',
      params: {
        exchange: exchange,
      },
      success: function(msg) {
        me.subs[msg.sub_id] = {
          id: msg.sub_id,
          exchange: exchange,
          onMessage: cb,
          scope: scope,
        };
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", me.subs);

        defer.resolve(msg.data);
      },
      failure: function(msg) {
        defer.reject(msg.reason);
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

    me.transmit(Object.assign({
      type: req.method,
      request_id: req.id,
    }, req.params));
  },

  flushDeferredRequests() {
    let me = this;

    me.deferredRequests.forEach(function(req) {
      me.transmitRequest(req);
    });

    me.deferredRequests = [];
  },
});
