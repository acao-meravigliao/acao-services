import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';

export default DS.Adapter.extend({
  vos: service('vihai-object-streaming'),

  defaultSerializer: '-json-api',

//  pathForType(modelName) {
//    let dasherized = Ember.String.dasherize(modelName);
//    return Ember.String.pluralize(dasherized);
//  },

  findRecord(store, type, id, snapshotRecordArray) {
    return this.vos.getSingle(type.modelName, id, snapshotRecordArray.adapterOptions);
  },

  findMany(store, type, ids, snapshotRecordArray) {
    return this.vos.getMany(type.modelName, ids, snapshotRecordArray.adapterOptions);
  },

//  querySignature(modelName, params) {
//    let sig = JSON.stringify({
//      model: modelName,
//      query: params,
//    });
//
//    return sig;
//  },
//
//  isQueryFullyLoaded(modelName, params) {
//    let sig = this.querySignature(modelName, params);
//
//    return this.fullyLoadedQueries[sig];
//  },

  findAll(store, type, sinceToken, snapshotRecordArray) {
    return this.vos.select({
      model: type.modelName,
      view: snapshotRecordArray.adapterOptions && snapshotRecordArray.adapterOptions.view,
      bind: true,
      fetchAll: true, // FIXME: find a way to disable fetchAll and return objects from the store
      persistent: true,
    }).then(function(res) {
      return res.objects;
    });
  },

  query(store, type, query, snapshotRecordArray) {
//    let sig = this.querySignature(type.modelName, {});
//    if (!sig) {
//      
//    }

    return this.vos.select({
      model: type.modelName,
      params: query.params,
      limit: query.limit,
      offset: query.offset,
      order: query.order,
      fetchAll: true,  // FIXME: find a way to disable fetchAll and return objects from the store
      persistent: false,
      view: snapshotRecordArray.adapterOptions && snapshotRecordArray.adapterOptions.view,
    }).then(function(res) {
//
//          me.collectionBindings[msg.cbinding_id] = { model: modelName, params: params, view: args.view };
//          me.collectionBindingsBySig[sig] = msg.cbinding_id;
//
//          if (!partial)
//            me.fullyLoadedQueries[sig] = msg.cbinding_id;
//

      return res.objects;
    });
  },

  shouldReloadQuery(modelName, params) {
    return this.vos.isQueryFullyLoaded(modelName, params);
  },

  queryRecord(store, type, query, snapshotRecordArray) {
    return this.vos.select({
      model: type.modelName,
      params: query.params,
      limit: 1,
      fetchAll: true,  // FIXME: find a way to disable fetchAll and return objects from the store
      view: snapshotRecordArray.adapterOptions && snapshotRecordArray.adapterOptions.view,
    }).then(function(res) {
console.log("RES=========================", res);
      return {
        data: res.objects[0] || null,
      };
    });
  },

  createRecord(store, type, snapshot) {
    let params =  assign({
    });

    let data = {};
    let serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    return this.vos.create(type.modelName, data, params);
  },

  updateRecord(store, type, snapshot) {
    let params =  assign({
    });

    let data = {};
    let serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

console.log("================= UPDATE_RECORD", data);

    return this.vos.update(type.modelName, data, params);
  },

  deleteRecord(store, type, snapshot) {
console.log("================= DELETE_RECORD", snapshot.id);
    return this.vos.destroy(type.modelName, snapshot.id);
  },
});
