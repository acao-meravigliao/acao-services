
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  totalPrice: computed('item.{count,service.price}', function() {
    return this.get('item.count') * this.get('item.service.price');
  }),

  actions: {
    plusOne() {
      this.set('item.count', this.get('item.count') + 1);
    },

    minusOne() {
      this.set('item.count', Math.max(this.get('item.count') - 1, 0));
    },

    remove() {
      this.get('item').deleteRecord();
      this.get('item').save();
    },
  },
});
