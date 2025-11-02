import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

class ServerFailure extends VihaiException { type = 'ServerFailure'; }

export default class AuthenDebtShowController extends Controller {
  @service session;
  @service router;
  @service toaster;
  @service vos;

  get debt() {
    return this.model.get_first('ygg--acao--debt');
  }

  get sorted_details() {
    return this.debt.details.sort((a,b) => (a.row_index - b.row_index));
  }

  get sorted_payments() {
    return this.debt.payments.sort((a,b) => (a.created_at - b.created_at));
  }

  get payments_total() {
    return this.debt.payments_total;
  }

  get payments_completed() {
    return this.debt.payments_completed;
  }

  get payments_completed_total() {
    return this.debt.payments_completed_total;
  }

  get payments_needed() {
    return this.debt.payments_needed;
  }

  @tracked paying_with = null;

  get paying_with_component() {
    return this.paying_with ?  ('payment/' + this.paying_with.toLowerCase()) : 'unknown';
  }

  @action pay_with(method) {
    this.paying_with = method;

//    this.router.transitionTo('authen.debt.pay_with.' + method);
  }

  @tracked pay_with_satispay_in_progress = false;
  @tracked pay_with_satispay_error;

  @action async pay_with_satispay() {
    this.pay_with_satispay_in_progress = true;
    let res;

    try {
      res = await this.vos.call(this.debt.id, 'pay_with_satispay', {}, { });
    } catch(e) {
      this.pay_with_satispay_in_progress = false;
      this.pay_with_satispay_error = e;
      return;
    }

    this.pay_with_satispay_in_progress = false;

    if (res.body.success)
      window.location.replace(res.body.redirect_url);
    else
      throw ServerFailure;
  }
}
