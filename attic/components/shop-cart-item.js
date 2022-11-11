import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ShopCartItemComponent extends Component {

  get totalPrice() {
    return this.get('item.count') * this.get('item.service.price');
  }

  @action plusOne() {
    this.set('item.count', this.get('item.count') + 1);
  }

  @action minusOne() {
      this.set('item.count', Math.max(this.get('item.count') - 1, 0));
  }

  @action remove() {
    this.item.deleteRecord();
    this.item.save();
  }
}
