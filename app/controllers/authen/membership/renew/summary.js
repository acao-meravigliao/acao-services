import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipRenewSummaryController extends Controller {
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  @tracked submitting = false;
  @tracked submit_error;

  get wizard() { return this.wizard_controller.wizard; }

  get total() {
    return this.wizard.services.reduce((previous, service) => (
             previous + ((service.type && service.enabled) ? service.type.price : 0)
           ), 0);
  }

  get can_submit() {
    return !this.submitting;
  }

  @action async submit() {
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
