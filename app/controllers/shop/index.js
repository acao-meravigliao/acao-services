import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  cart: service('shopping-cart'),

  actions: {
    addToCart(serviceType) {
      this.get('cart').add(serviceType);
    },
  },
});
