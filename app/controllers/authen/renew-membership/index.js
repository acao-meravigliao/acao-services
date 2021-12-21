import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenRenewMembershipIndexController extends Controller {
  @service session;
  @controller('authen.renew-membership') wizard;
  @service('my-clock') clock;

  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }

  get renewIsOpen() { return this.wizard.renewIsOpen; }

  get paymentIsPending() {
    return this.context.membership.status == 'WAITING_PAYMENT' &&
           this.context.membership.payment_id;
  }

  get myEmails() {
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", this.wizard);
    return this.context.person.contacts.filterBy('type', 'email');
  }

  get myFixedPhones() {
    return this.context.person.contacts.filterBy('type', 'phone');
  }

  get myMobiles() {
    return this.context.person.contacts.filterBy('type', 'mobile');
  }

  @action commit() {
    this.transitionToRoute('authen.renew-membership.data');
  }
}
