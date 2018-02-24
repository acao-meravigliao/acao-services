import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),

  init() {
    this._super(...arguments);
    this.set('items', this.get('store').peekAll('cart-entry'));
    this.get('store').findAll('cart-entry');
  },

  add(serviceType) {
    let record = this.get('items').find(function(item) {
      console.log("ITEM", item.belongsTo('service').id(), serviceType.get('id'));
      return item.belongsTo('service').id() == serviceType.get('id');
    });

    if (record) {
      record.set('count', record.get('count') + 1);
      record.save();
    } else {
      record = this.get('store').createRecord('cart-entry', {
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
    this.get('items').forEach(function(item) {
      item.deleteRecord();
      item.save();
    });
  },
});
