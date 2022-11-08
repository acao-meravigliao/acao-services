import DS from 'ember-data';
import { service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default DS.Adapter.extend({
  vos: service('vihai-object-streaming'),

  defaultSerializer: '-json-api',

//  pathForType(modelName) {
//    let dasherized = Ember.String.dasherize(modelName);
//    return Ember.String.pluralize(dasherized);
//  },

  findRecord(store, type, id, snapshotRecordArray) {
    return this.vos.getSingle(type.modelName, id, snapshotRecordArray.adapterOptions).
             catch((e) => { throw(e.exception); });
  },

  findMany(store, type, ids, snapshotRecordArray) {
    return this.vos.getMany(type.modelName, ids, snapshotRecordArray.adapterOptions).
             catch((e) => { throw(e.exception); });
  },

  querySignature(modelName, query) {
    let sig = JSON.stringify({
      model: modelName,
      query: { filter: query.filter },
    });

    return sig;
  },

  findAll(store, type, sinceToken, snapshotRecordArray) {
    let sig = this.querySignature(type.modelName, {});
    if (this.selections[sig]) {
      this.selections[sig].complete = true;
      //return { data: [] }; FIXME, we can not refreain from returning all the objects
    }

    return this.vos.select({
      model: type.modelName,
      view: snapshotRecordArray.adapterOptions && snapshotRecordArray.adapterOptions.view,
      bind: true,
      fetchAll: true, // FIXME: find a way to disable fetchAll and return objects from the store
      persistent: true,
    }).then((res) => {
      this.selections[sig] = { id: res.selection_id, complete: true };
      return res.objects;
    }).catch((e) => { throw(e.exception); });
  },

  query(store, type, query, snapshotRecordArray, options) {
    let sig = this.querySignature(type.modelName, { filter: query.filter });
    if (this.selections[sig]) {
      this.selections[sig].complete = this.selections[sig].complete || !(query.limit || query.offset);
      //return { data: [] }; FIXME, we can not refreain from returning all the objects
    }

    return this.vos.select({
      model: type.modelName,
      params: { filter: query.filter },
      limit: query.limit,
      offset: query.offset,
      order: query.order,
      fetchAll: true,  // FIXME: find a way to disable fetchAll and return objects from the store
      persistent: true,
      view: options.adapterOptions && options.adapterOptions.view,
    }).then((res) => {
      this.selections[sig] = { id: res.selection_id, complete: res.objects.data.length === res.objects.meta.total_count };
      return res.objects;
    }).catch((e) => { throw(e.exception); });
  },

  shouldReloadQuery(modelName, query) {
    let sig = this.querySignature(modelName, query);
console.log("SHOULD RELOAD QUERY", this.selections);

    return !this.selections[sig] || !this.selections[sig].complete;
  },

  queryRecord(store, type, query, snapshotRecordArray) {
    return this.vos.select({
      model: type.modelName,
      params: { filter: query.filter },
      limit: 1,
      fetchAll: true,  // FIXME: find a way to disable fetchAll and return objects from the store
      view: snapshotRecordArray.adapterOptions && snapshotRecordArray.adapterOptions.view,
    }).then((res) => {
      if (res.objects.length > 0) {
        return {
          data: res.objects.data[0],
          included: res.objects.included,
        };
      } else {
        return {
          data: null,
        };
      }
    }).catch((e) => { throw(e.exception); });
  },

  createRecord(store, type, snapshot) {
    let params =  assign({
    });

    let data = {};
    let serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    return this.vos.create(type.modelName, data, params).catch((e) => { throw(e.exception); });
  },

  updateRecord(store, type, snapshot) {
    let params =  assign({
    });

    let data = {};
    let serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

console.log("================= UPDATE_RECORD", data);

    return this.vos.update(type.modelName, data, params).catch((e) => { throw(e.exception); });
  },

  deleteRecord(store, type, snapshot) {
console.log("================= DELETE_RECORD", snapshot.id);
    return this.vos.destroy(type.modelName, snapshot.id).catch((e) => { throw(e.exception); });
  },

  init() {
    this._super(...arguments);
    this.selections = {};
  },
});
