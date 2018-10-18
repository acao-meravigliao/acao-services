import DS from 'ember-data';
import { default as RSVP, Promise } from 'rsvp';

export default DS.Store.extend({

  // Override query and return matching records if they are in the store
  query(modelName, query) {
    let normalizedModelName = DS.normalizeModelName(modelName);
    let adapter = this.adapterFor(normalizedModelName);

console.log("STORE QUERY", modelName, query);

    if (typeof(adapter.shouldReloadQuery) === 'function' && !adapter.shouldReloadQuery(modelName, { filter: query.filter })) {
console.log("STORE QUERY CAN FILTER WITHOUT QUERYING", modelName, query);

      let array = this.peekAll(normalizedModelName);
      let filter = query.filter;
      if (filter) {
        array = array.filter((item) => (
          Object.keys(filter).every((key) => (item[key] == filter[key]))
        ));
      }

      return DS.PromiseArray.create({ promise: Promise.resolve(array) });
    } else {
      return this._super(...arguments);
    }
  },
});
