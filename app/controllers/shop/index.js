import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
  cart: service('shopping-cart'),

  actions: {
    addToCart(serviceType) {
      this.get('cart').add(serviceType);
    },
  },
});
