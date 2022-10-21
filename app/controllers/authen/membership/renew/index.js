import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenMembershipRenewIndexController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard;
  @service clock;

  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }

  get renew_is_open() { return this.wizard.renew_is_open; }

  get payment_is_pending() {
    return this.context.membership.status == 'WAITING_PAYMENT' &&
           this.context.membership.payment_id;
  }

  get my_emails() {
    return this.context.person.contacts.filterBy('type', 'email');
  }

  get my_fixed_phones() {
    return this.context.person.contacts.filterBy('type', 'phone');
  }

  get my_mobiles() {
    return this.context.person.contacts.filterBy('type', 'mobile');
  }

  @action submit() {
    this.router.transitionTo('authen.membership.renew.data');
  }
}
