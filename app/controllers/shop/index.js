import Ember from 'ember';

export default Ember.Controller.extend({
  cart: Ember.inject.service('shopping-cart'),

  actions: {
    addToCart(serviceType) {
      this.get('cart').add(serviceType);
    },
  },
});
