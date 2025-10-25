import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenMembershipRenewAircraftNewController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;
  @service clock;

  @tracked enter_aircraft_data = false;

  get wizard() { return this.wizard_controller.wizard; }

  get aircraft() {
    return this.model.aircraft;
  }

  @action has_glider_no_clicked() {
  }

  @action has_glider_yes_clicked() {
    this.enter_aircraft_data = true;
  }


  @action okay_clicked() {
    this.wizard.next('roster-select');
  }

//  @action submit_no() {
//    this.wizard.next('bio-edit');
//  }

  @action back() {
    this.wizard.prev();
  }
}
