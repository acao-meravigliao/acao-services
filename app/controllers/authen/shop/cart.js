import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ShopCartController extends Controller {
//  @service('shopping-cart') cart;

  @action emptyCart() {
    this.cart.empty();
  }
}
