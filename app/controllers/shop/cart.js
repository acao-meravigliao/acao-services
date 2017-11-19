import Ember from 'ember';

export default Ember.Controller.extend({
  cart: Ember.inject.service('shopping-cart'),

  actions: {
    emptyCart() {
      this.get('cart').empty();
    },
  },
});
