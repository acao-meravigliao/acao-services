import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
  cart: service('shopping-cart'),

  total: Ember.computed('cart.items.@each', function() {
    return this.get('cart.items').reduce(function(previous, item) {
      return previous + item.get('service.price');
    }, 0);
  }),

  actions: {
    submit() {
    },
  },
});
