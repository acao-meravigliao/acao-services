import Ember from 'ember';
import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default DS.Adapter.extend({
  ws: service('web-socket'),

  defaultSerializer: '-json-api',

//  pathForType(modelName) {
//    let dasherized = Ember.String.dasherize(modelName);
//    return Ember.String.pluralize(dasherized);
//  },

  findRecord(store, type, id, snapshotRecordArray) {
    let params =  assign({
      id: id,
      multiple: false,
    }, snapshotRecordArray.adapterOptions);

console.log("================= FIND RECORD", type.modelName, id, params);

    if (snapshotRecordArray.adapterOptions && snapshotRecordArray.adapterOptions.doNotBind)
      return this.get('ws').get(type.modelName, params);
    else
      return this.get('ws').getAndBind(type.modelName, params);
  },

  findMany(store, type, ids, snapshotRecordArray) {
    let params =  assign({
      ids: ids,
      multiple: true,
    }, snapshotRecordArray.adapterOptions);

console.log("================= FIND MANY", type.modelName, ids, params);

    return this.get('ws').getAndBind(type.modelName, params);
  },

  findAll(store, type, sinceToken, snapshotRecordArray) {
    let params =  assign({
      multiple: true,
    }, snapshotRecordArray.adapterOptions);

console.log("================= FIND ALL", type.modelName, params);

    return this.get('ws').getAndBind(type.modelName, params);
  },

  query(store, type, query, snapshotRecordArray) {
    let params =  assign({
      multiple: true,
    }, query, snapshotRecordArray.adapterOptions);

console.log("================= QUERY", type.modelName, query, params);

//    if (snapshotRecordArray.adapterOptions && snapshotRecordArray.adapterOptions.transport == 'HTTP')
//      return this.get('ws').getAndBind(type.modelName, null, query);
//    else
    return this.get('ws').getAndBind(type.modelName, params);
  },

  queryRecord(store, type, query) {
    let params =  assign({
      multiple: false,
    }, query);

console.log("================= QUERY RECORD", type.modelName, query, params);

    return this.get('ws').getAndBind(type.modelName, params);
  },

  createRecord(store, type, snapshot) {
    let params =  assign({
    });

    let data = {};
    let serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

console.log("================= CREATE_RECORD", data);

    return this.get('ws').createAndBind(type.modelName, data, params);
  },

  updateRecord(store, type, snapshot) {
    let params =  assign({
    });

    let data = {};
    let serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

console.log("================= UPDATE_RECORD", data);

    return this.get('ws').update(type.modelName, data, params);
  },

  deleteRecord(store, type, snapshot) {
console.log("================= DELETE_RECORD", snapshot.id);
    return this.get('ws').destroy(type.modelName, snapshot.id);
  },
});
