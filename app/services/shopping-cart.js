import Service, { service } from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default Service.extend({
  store: service(),

  init() {
    this._super(...arguments);
    this.set('items', this.store.peekAll('cart-entry'));
    this.store.findAll('cart-entry');
  },

  add(serviceType) {
    let record = this.items.find(function(item) {
      console.log("ITEM", item.belongsTo('service').id(), serviceType.get('id'));
      return item.belongsTo('service').id() == serviceType.get('id');
    });

    if (record) {
      record.set('count', record.get('count') + 1);
      record.save();
    } else {
      record = this.store.createRecord('cart-entry', {
        count: 1,
        service: serviceType,
      });

      record.save();
    }
  },

  remove(item) {
    item.deleteRecord();
    item.save();
  },

  empty() {
    this.items.forEach(function(item) {
      item.deleteRecord();
      item.save();
    });
  },
});
