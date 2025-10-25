import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenMembershipRenewRulesController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  get wizard() { return this.wizard_controller.wizard; }

  @action accept() {
    this.wizard.rules_accepted = true;

    this.wizard.next('privacy');
  }

  @action back() {
    this.wizard.prev();
  }
}
