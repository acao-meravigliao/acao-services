import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class BarGaugeComponent extends Component {
  @service router;

  @action open_list() {
    this.router.transitionTo("authen.bar.transactions");
  }

  @action recharge() {
    this.router.transitionTo("authen.bar.recharge");
  }
}
