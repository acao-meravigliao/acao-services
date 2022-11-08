import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenMembershipRenewIndexController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;
  @service clock;

  get wizard() { return this.wizard_controller.wizard; }

  get renew_is_open() { return this.wizard.renew_is_open; }

  get payment_is_pending() {
    return this.wizard.membership.status === 'WAITING_PAYMENT' &&
           this.wizard.membership.payment_id;
  }

  get my_emails() {
    return this.wizard.person.contacts.filterBy('type', 'email');
  }

  get my_fixed_phones() {
    return this.wizard.person.contacts.filterBy('type', 'phone');
  }

  get my_mobiles() {
    return this.wizard.person.contacts.filterBy('type', 'mobile');
  }

  @action submit() {
    this.wizard.next('data');
  }
}
