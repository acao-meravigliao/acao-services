import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class CheckoutController extends Controller {
//  @service('shopping-cart') cart;

  get total() {
    return this.get('cart.items').reduce(function(previous, item) {
      return previous + item.get('service.price');
    }, 0);
  }
}
