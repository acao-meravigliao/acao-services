import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenMembershipRenewMailingController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  get wizard() { return this.wizard_controller.wizard; }

  @action accept() {
    this.wizard.email_allowed = true;

    this.wizard.next('bill');
  }

  @action refuse() {
    this.wizard.email_allowed = false;

    this.wizard.next('bill');
  }

  @action back() {
    this.wizard.prev();
  }
}
