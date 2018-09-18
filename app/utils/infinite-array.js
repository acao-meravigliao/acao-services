import EmberObject from '@ember/object';
import Service, { inject as service } from '@ember/service';

export default EmberObject.extend({
  store: service(),

  init() {
console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUuuu 1");
    this._super(...arguments);
  },

  length() {
console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUuuu 2");
    return 1;
  },

  objectAt(index) {
console.log("OBJECT AT ==========================================", index);
    return this.store.fetchAll('ygg--acao--flight').first();
  },
});
