import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PayWithSatispayComponent extends Component {
  @service vos;
  @service intl;

  @tracked amount;
  @tracked modal_open = false;
  @tracked in_progress = false;
  @tracked error;

  @action open_modal() {
    this.modal_open = true;
  }

  @action close_modal() {
    this.error = null;
    this.modal_open = false;
  }

  @action amount_on_change(el) {
    this.error = null;
    this.amount = parseFloat(el.target.value);
  }

  @action amount_on_input(el) {
    this.error = null;
  }

  get amount_for_input() {
    return this.amount ? this.amount.toFixed(2) : null;
  }

  get okay_disabled() {
    return this.in_progress || !this.amount;
  }

  @action async okay() {
    this.error = null;
    this.in_progress = true;
    let res;

    try {
      res = await this.vos.class_call('ygg--acao--bar-transaction',  'pay_with_satispay', { }, { amount: this.amount });
    } catch(e) {
      this.in_progress = false;
      this.error = e;
      return;
    }

    console.log("BBBBBBBBBBBBBBBBBBBBBBBBB", res);

    this.progress = false;

    if (res.body.success)
      window.location.replace(res.body.redirect_url);
    else
      throw ServerFailure;
  }

}
