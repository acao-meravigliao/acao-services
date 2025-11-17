import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { inject as controller } from '@ember/controller';

export default class BarTransactionController extends Controller {
  @service session;
  @service router;
  @controller('authen') authen_controller;

  get member() {
    return this.authen_controller.member;
  }

  get bar_transactions() {
    return this.model.get_cls('ygg--acao--bar-transaction');
  }

  get sorted_models() {
    return this.bar_transactions.sort((a,b) => (b.recorded_at - a.recorded_at));
  }

  @action set_span(val) {
    this.router.transitionTo({ queryParams: { span: val.toString() }});
  }

  @action async pay_with_satispay() {
    this.pay_with_satispay_in_progress = true;
    let res;

    try {
      res = await this.vos.class_call(this.debt.id, 'pay_with_satispay', {}, { });
    } catch(e) {
      this.pay_with_satispay_in_progress = false;
      this.pay_with_satispay_error = e;
      return;
    }

    console.log("BBBBBBBBBBBBBBBBBBBBBBBBB", res);

    this.pay_with_satispay_in_progress = false;

    if (res.body.success)
      window.location.replace(res.body.redirect_url);
    else
      throw ServerFailure;
  }


}
