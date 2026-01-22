import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Decimal from 'decimal.js';

export default class AuthenMembershipRenewSummaryController extends Controller {
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  @tracked submitting = false;
  @tracked submit_error;

  get wizard() { return this.wizard_controller.wizard; }

  get total() {
    return this.wizard.services.reduce((a, service) => (
             a.plus((service.type && service.enabled) ? service.type.price : Decimal(0))
           ), Decimal(0));
  }

  get can_submit() {
    return !this.submitting;
  }

  @action async submit() {
    this.submit_error = null;
    this.submitting = true;

    let json;

    try {
      json = await this.wizard.submit();
    } catch(e) {
      this.submit_error = e;
      return;
    } finally {
      this.submitting = false;
    }

    this.wizard.debt_id = json.debt_id;
    this.wizard.next('confirmation');
//    this.send('refresh_model');
  }

  @action back() {
    this.wizard.prev();
  }
}
