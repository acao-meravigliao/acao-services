import Service from '@ember/service';
import config from '../config/environment';
import Evented from '@ember/object/evented';
import { service } from '@ember/service';
import { cancel, later } from '@ember/runloop';
import { Promise, defer as rsvpDefer } from 'rsvp';
import $ from 'jquery';
import { getOwner } from '@ember/application';

export default Service.extend(Evented, {

  reconnectDelayConstant: 500,
  reconnectBackoff: 2.0,
  reconnectLimit: 15000,

  keepaliveFrequency: 5000,
  keepaliveTimeout: 10000,

  store: service('store'),

  init() {
    let me = this;

    this._super(...arguments);

    me.uri = (window.location.protocol == 'http:' ? 'ws://' : 'wss://') + window.location.host + '/vos';
    //me.uri = 'ws://linobis.acao.it:3330/vos'

    me.state = 'DISCONNECTED';
    me.reconnectAttempt = 0;
    me.keepaliveTimer = null;
    me.keepaliveTimeoutTimer = null;

    me.session = null;

    me.connectionRequests = [];

    me.currentRequestId = 0;
    me.requests = {};
    me.deferredRequests = [];

    me.selections = {};
    me.selectionsByModel = {};

    me.subs = {};

    document.addEventListener("visibilitychange", function() {
console.log("VISIBILITY_CHANGE", document.visibilityState, "IN STATE", me.state);
      switch(me.state) {
      case 'READY':
        if (document.visibilityState == 'visible') {
          me.startKeepalive();
          me.transmit({
            type: 'awake',
          });
        } else {
          me.stopKeepalive();
          me.transmit({
            type: 'idle',
          });
        }
      break;

      case 'INVISIBLE_IDLE':
        me.connect();
      }
    });
  },

  startKeepalive() {
    let me = this;

    me.keepaliveTimer = later(me, me.keepalive, me.keepaliveFrequency);

    me.resetKeepalive();
  },

  resetKeepalive() {
    let me = this;

    if (me.keepaliveTimeoutTimer !== null)
      cancel(me.keepaliveTimeoutTimer);

    me.keepaliveTimeoutTimer = later(me, function() {
      me.keepaliveTimedout();
    }, me.keepaliveTimeout);
  },

  stopKeepalive() {
    let me = this;

    cancel(me.keepaliveTimer);
    me.keepaliveTimer = null;

    if (me.keepaliveTimeoutTimer !== null) {
      cancel(me.keepaliveTimeoutTimer);
      me.keepaliveTimeoutTimer = null;
    }
  },

  keepalive() {
    let me = this;

    me.transmit({
      type: 'keepalive',
    });

    me.keepaliveTimer = later(me, me.keepalive, me.keepaliveFrequency);
  },

  keepaliveTimedout() {
    this.socket.close();
  },

  transmit(msg) {
    let me = this;

//    console.log("MSG >>>", msg);

    me.socket.send(JSON.stringify(msg));
  },

  connect() {
    let me = this;

    let defer = rsvpDefer();

    switch(me.state) {
    case 'DISCONNECTED':
    case 'INVISIBLE_IDLE':
      me.changeState('CONNECTING');

      me.connectionRequests.push(defer);
      me.doConnect(defer);
    break;

    case 'READY':
    case 'READY_OFFLINE':
      defer.resolve(me.session);
    break;

    default:
      me.connectionRequests.push(defer);
    }

    return defer.promise;
  },

  reconnect() {
    this.disconnect();

    return this.connect();
  },

  disconnect() {
    switch(this.state) {
    case 'DISCONNECTED':
    case 'READY_OFFLINE':
    break;

    case 'INVISIBLE_IDLE':
    case 'CONNECTING':
    case 'OPEN_WAIT_WELCOME':
    case 'RECONNECTING':
    case 'RECONNECT_WAIT':
    case 'READY':
      this.doDisconnect();
    break;
    }
  },

  doConnect(defer) {
    let me = this;

    me.lastAttempt = Date.now();

    me.socket = new WebSocket(me.uri, 'vos.sevio.it');

    me.socket.onopen = function(/*ev*/) {
      me.changeState('OPEN_WAIT_WELCOME');
    };

    me.socket.onmessage = function (ev) {
      let msg = JSON.parse(ev.data)

      me.onMessage(msg);
    };

    me.socket.onerror = function (ev) {
      me.trigger('error', ev);
      console.log("ONERROR", ev);
      me.connectionRequests.forEach((req) => (req.reject(ev)));
    };

    me.socket.onclose = function (ev) {
      me.onClose(ev);
    };
  },

  doDisconnect() {
    this.socket.close();
    this.changeState('DISCONNECTED');
  },

  onMessage: function(msg) {
    let me = this;

//    console.log("MSG <<<", msg);

    let req = null;

    if (msg.reply_to !== undefined && msg.reply_to !== null) {
      req = me.requests[msg.reply_to];
      if (!req) {
        console.log(msg.type, 'for unknown request', msg.reply_to);
        return;
      }
    }

    me.resetKeepalive();

    switch(msg.type) {
    case 'welcome': {
console.log("WELCOME", msg);

      if (me.state != 'OPEN_WAIT_WELCOME') {
        console.warn('VOS received \'welcome\' in unexpected state', me.state);
        return;
      }

      me.session = msg.session;

      if (!me.app_version)
        me.app_version = msg.app_version;

      if (me.app_version != msg.app_version)
        me.trigger('version_mismatch', me.app_version, msg.app_version);

      me.connectionRequests.forEach((req) => (req.resolve(me.session)));
      me.connectionRequests = [];

      me.trigger('welcome', msg);

      me.transmit({
        type: 'set_params',
        body: {
          keepalive_time: me.keepaliveFrequency / 1000.0,
          keepalive_timeout: me.keepaliveTimeout / 1000.0,
          accept: 'application/vnd.api+json',
          content_type: 'application/vnd.api+json',
        },
      });

      if (me.selectionsSaved) {
console.log("RECREATING SELECTIONS", me.selectionsSaved);

        $.each(me.selectionsSaved, function(key, binding) {
          me.select({
            model: binding.model,
            params: binding.params,
            offset: 0,
            limit: 0,
            persistent: true,
          })
        });

        me.savedCollectionBindings = null;
      }

//      /////////// FIXME, don't go in ready state until all models/resources have been rebound
//
//      let regexp = new RegExp(config.modulePrefix + '/models/(.*)$');
//      let owner = getOwner(this);
//      let typeNames = owner.lookup('data-adapter:main').getModelTypes().map(type => type.name);
//
//      typeNames.forEach(function(modelType) {
//        if (me.get('store').adapterFor(modelType) == me.get('store').adapterFor('application')) {
//          let models = me.get('store').peekAll(modelType);
//
//          let ids = [];
//          models.forEach(function(model) {
//            if (model.get('isLoaded'))
//              ids.push(model.get('id'));
//          });
//
//          if (ids.length > 0) {
//            console.log("RESTORING MODEL", modelType, ids);
//
//            me.getMany(modelType, ids).catch((e) => {
//              console.warn("Cannot rebind model", modelType, ids, e);
//            });
//          }
//        }
//      });

      me.reconnectAttempt = 0;

      if (!msg.online) {
        me.offlineReason = msg.offline_reason;
        me.changeState('READY_OFFLINE');
        me.trigger('offline', me.offlineReason);
      } else {
        me.changeState('READY');
        me.trigger('online');
        me.flushDeferredRequests();
      }

      me.startKeepalive();
    }
    break;

    case 'keepalive':
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
        reply_to: msg.request_id,
      });
    break;

    case 'create':
console.log("CREATE OBJ=", msg);

      me.get('store').pushPayload(msg.object);
    break;

    case 'update':
console.log("UPDATE OBJ=", msg);

      me.get('store').pushPayload(msg.object);
    break;

    case 'destroy': {
console.log("DESTROY OBJ=", msg);
      let model = me.get('store').peekRecord(msg.object_type, msg.object_id);
      // XXX Send didDelete event??

      if (model)
        model.unloadRecord();
    }
    break;

    case 'pong':
    case 'select_ok':
    case 'select_unbind_ok':
    case 'get_ok':
    case 'getmany_ok':
    case 'create_ok':
    case 'update_ok':
    case 'destroy_ok':
    case 'unbind_ok':
    case 'sub_ok':
    case 'unsub_ok':
    case 'auth_ok':
    case 'logout_ok':
      console.log(msg.type.toUpperCase(), msg, "REQ=", me.requests[msg.reply_to]);

      delete me.requests[msg.reply_to];

      req.success(msg);
    break;

    case 'auth_fail':
    case 'exception':
    case 'message_not_handled':
      console.error("EXCEPTION", msg, "REQ=", req);

      delete me.requests[msg.reply_to];

      if (req)
        req.failure(msg);
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

    default:
      console.log("Unhandled message type", msg.type);
    }
  },

  onClose(ev) {
    var me = this;

    me.offlineReason = 'Websocket closed';

    // MAKE THOSE FAIL???
    me.requests = {};

    if (!me.selectionsSaved) {
      me.selectionsSaved = me.selections;
      me.selections = {};
      me.selectionsByModel = {};

  console.log("PERSISTENT SELECTIONS SAVED", me.selections, me.selectionsSaved);
    }

    me.connectionRequests.forEach((req) => (req.reject(ev)));
    me.connectionRequests = [];

    me.trigger('close', ev);
    me.trigger('offline', me.offlineReason);

    me.stopKeepalive();

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

        later(me, function() {
          me.changeState('RECONNECTING');
          me.doConnect();
        }, me.delay);
      }
    } else {
      me.changeState('INVISIBLE_IDLE');
    }
  },

  pickRequestId() {
    return this.currentRequestId++;
  },

  authenticate(username, password) {
console.log("VOS AUTHENTICATE");

    let defer = rsvpDefer();

    let req = {
      method: 'auth',
      params: {
        username: username,
        password: password,
      },
      success: ((msg) => {
        this.session = msg.session;
console.log("VOS AUTHENTICATE SUCCESS", msg);

        defer.resolve(msg.session);
      }),
      failure: ((msg) => {
        console.error("AUTH FAILURE REQ=", req, "RESULT=", msg);

        if (msg.type == 'auth_fail') {
          defer.reject({
            reason: msg.reason,
            requestId: msg.reply_to,
          });
        } else {
          defer.reject({
            exception: msg.payload,
            requestId: msg.reply_to,
          });
        }
      }),
    };

    this.makeRequest(req);

    return defer.promise;
  },

  logout() {
console.log("VOS LOGOUT");
    let defer = rsvpDefer();

    let req = {
      method: 'logout',
      params: { },
      success: ((msg) => {
        this.session = msg.session;

        defer.resolve(msg.session);
      }),
      failure: ((msg) => {
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      }),
    };

    this.makeRequest(req);

    return defer.promise;
  },

  ping() {
    let me = this;

    let defer = rsvpDefer();

    let req = {
      method: 'ping',
      params: {},
      success: function(msg) {
        defer.resolve(msg.objects);
      },
      failure: function(msg) {
        console.error("PING FAILURE REQ=", req, "RESULT=", msg);
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  select(args) {
    let me = this;

    let modelName = args.model;
    let params = args.params;
    let persistent = args.persistent !== false;
    let bind_objects = args.bind_objects !== false;
    let bind_selection = args.bind_selection !== false;
    let bind_on_create = args.bind_on_create !== false;

console.log("SELECT", args);

    let defer = rsvpDefer();

    let req = {
      method: 'select',
      params: {
        model: modelName,
        bind_objects: bind_objects,
        bind_selection: bind_selection,
        bind_on_create: bind_on_create,
        params: params,
        offset: args.offset,
        limit: args.limit,
        order: args.order,
        view: args.view,
        persistent: persistent,
        fetch_all: args.fetchAll,
      },
      success: function(msg) {
        if (persistent) {
          let selection = { model: modelName, params: params, view: args.view };
          me.selections[msg.selection_id] = selection;
          me.selectionsByModel[modelName] = selection;
        }

        defer.resolve({
          objects: msg.objects,
          ids: msg.ids,
          selection_id: msg.selection_id,
        });
      },
      failure: function(msg) {
        console.error("SELECT FAILURE REQ=", req, "RESULT=", msg);
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  getSingle(modelName, id, params) {
    let me = this;

console.log("GET_SINGLE", modelName, id, params);

    params = params || {};
    let bind = params.bind !== false;
    let bind_relations = params.bind_relations !== false;
    let bind_sideloadings = params.bind_sideloadings !== false;

    let defer = rsvpDefer();

    let req = {
      method: 'get',
      params: Object.assign({
        model: modelName,
        id: id,
        bind: bind,
        bind_relations: bind_relations,
        bind_sideloadings: bind_sideloadings,
        view: params.view,
      }),
      success: function(msg) {
        defer.resolve(msg.object);
      },
      failure: function(msg) {
        console.error("GET_SINGLE FAILURE REQ=", req, "RESULT=", msg);
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  getMany(modelName, ids, params) {
    let me = this;

    params = params || {};
    let bind = params.bind !== false;

console.log("GET_MANY", modelName, ids, params);

    let defer = rsvpDefer();

    let req = {
      method: 'getmany',
      params: {
        model: modelName,
        ids: ids,
        bind: bind,
        view: params.view,
      },
      success: function(msg) {
        defer.resolve(msg.objects);
      },
      failure: function(msg) {
        console.error("GET_MANY FAILURE REQ=", req, "RESULT=", msg);
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  create(modelName, data, params) {
    let me = this;

console.log("CREATE_AND_BIND", modelName, data, params);

    let defer = rsvpDefer();

    let req = {
      method: 'create',
      params: Object.assign({
        model: modelName,
        object: data,
        bind: true,
        content_type: 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
      }, params),
      success: function(msg) {
        defer.resolve(msg.object);
      },
      failure: function(msg) {
        console.error("CREATE_AND_BIND FAILURE REQ=", req, "RESULT=", msg);
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  update(modelName, data, params) {
    let me = this;

console.log("UPDATE", modelName, data, params);

    let defer = rsvpDefer();

    let req = {
      method: 'update',
      params: Object.assign({
        model: modelName,
        object: data,
        content_type: 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
      }, params),
      success: function(msg) {
        defer.resolve(msg.object);
      },
      failure: function(msg) {
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  destroy(modelName, id) {
    let me = this;

console.log("DESTROY", modelName, id);

    let defer = rsvpDefer();

    let req = {
      method: 'destroy',
      params: Object.assign({
        model: modelName,
        id: id,
      }),
      success: function(msg) {
        defer.resolve(msg.object);
      },
      failure: function(msg) {
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  subscribe(exchange, cb, scope) {
console.log("SUBSCRIBE", arguments);

    let me = this;

    let defer = rsvpDefer();

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

        defer.resolve(msg.data);
      },
      failure: function(msg) {
        defer.reject({
          exception: msg.payload,
          requestId: msg.reply_to,
        });
      },
    };

    me.makeRequest(req);

    return defer.promise;
  },

  makeRequest(req) {
    let me = this;

    switch(me.state) {
    case 'DISCONNECTED':
    case 'INVISIBLE_IDLE':
      me.connect();
      me.deferredRequests.push(req);
    break;

    case 'CONNECTING':
    case 'OPEN_WAIT_WELCOME':
    case 'RECONNECTING':
      me.deferredRequests.push(req);
    break;

    case 'READY':
      me.transmitRequest(req);
    break;

    case 'RECONNECT_WAIT':
    case 'READY_OFFLINE':
      // Simulate a failure message
      req.failure({
        type: 'exception',
        content_type: 'application/problem+json',
        payload: {
          type: 'vos_offline',
          title: 'Lost connection with vihai-object-streaming',
          title_sym: 'vos_lost_connection',
        },
      });
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

  changeState(newState) {
    let me = this;

    console.log('VOS', me.uri, 'Changed state from', me.state, 'to', newState);

    me.set('state', newState);
  },

});
