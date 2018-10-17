import DS from 'ember-data';
import { default as RSVP, Promise } from 'rsvp';

export default DS.Store.extend({

  // Override query and return matching records if they are in the store
  query(modelName, query) {
    let normalizedModelName = DS.normalizeModelName(modelName);
    let adapter = this.adapterFor(normalizedModelName);

    return this._super(...arguments);

//    if (typeof(adapter.shouldReloadQuery) === 'function' && adapter.shouldReloadQuery(modelName, query)) {
//      let array = this.peekAll(normalizedModelName);
//
//console.log("ARRAY LEN=", array.length, query);
//      let filter = query.params.filter;
//      if (filter) {
//        array = array.filter((item) => (
//          Object.keys(filter).every((key) => (item[key] == filter[key]))
//        ));
//      }
//console.log("ARRAY LEN2=", array.length);
//
//      return DS.PromiseArray.create({ promise: Promise.resolve(array) });
//    } else
//      return this._super(...arguments);
  },
});
