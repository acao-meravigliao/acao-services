import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  cart: service('shopping-cart'),

  total: computed('cart.items.@each', function() {
    return this.get('cart.items').reduce(function(previous, item) {
      return previous + item.get('service.price');
    }, 0);
  }),

  actions: {
    submit() {
    },
  },
});
