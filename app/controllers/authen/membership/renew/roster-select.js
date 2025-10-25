import Controller from '@ember/controller';
import { service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipRenewRosterSelectController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;
  @controller('authen') authen_controller;

  @tracked selection;
  @tracked selection_valid;

  get wizard() {
    return this.wizard_controller.wizard;
   }

  get roster_days() {
    return this.model.get_all('ygg--acao--roster-day');
  }

  get member() {
    return this.authen_controller.member;
  }

  get roster_status() {
    return this.wizard.roster_status;
  }


  @action selection_changed(selection) {
    this.selection = selection;
  }

  @action selection_validity_changed(valid) {
    this.selection_valid = valid;
  }

  get submit_enabled() {
    return this.selection_valid;
  }

  @action submit() {
    this.wizard.update({
      selected_roster_days: A(this.selection),
    });

    this.wizard.next('summary');
  }

  @action back() {
    this.wizard.prev();
  }
}
