import Controller from '@ember/controller';
import { service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipRenewRosterController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  @tracked selection;
  @tracked selection_valid;

  get wizard() { return this.wizard_controller.wizard; }

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
      selected_roster_days: this.selection,
    });

    this.wizard.next('summary');
  }

  @action back() {
    this.wizard.prev();
  }
}
