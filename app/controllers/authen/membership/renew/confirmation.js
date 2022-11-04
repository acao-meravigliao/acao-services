import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenMembershipRenewConfirmationController extends Controller {
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  get wizard() { return this.wizard_controller.wizard; }
}
