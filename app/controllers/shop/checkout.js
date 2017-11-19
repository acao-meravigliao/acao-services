import Ember from 'ember';

export default Ember.Controller.extend({
  cart: Ember.inject.service('shopping-cart'),

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
