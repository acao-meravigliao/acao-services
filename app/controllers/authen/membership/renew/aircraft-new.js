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

  reset() {
    this.another_aircraft = null;
    this.registration = null;
    this.registration_entered = null;
    this.referent = null;
    this.parking = null;
  }

  @tracked another_aircraft = null;
  @action another_aircraft_yes_clicked() {
    this.another_aircraft = true;
  }

  @action another_aircraft_no_clicked() {
    this.wizard.next('rules');
  }

  @tracked registration = '';
  @tracked registration_entered = false;
  @action registration_on_input(ev) {
  }

  @action registration_on_change(ev) {
    this.registration_entered = (ev.target.value !== '');
    this.registration = ev.target.value.trim().toUpperCase();
  }

  //---------

  @tracked referent = null;

  get referent_confirmed() { return this.referent !== null }

  @action referent_click_yes() {
    this.referent = true;
  }

  @action referent_click_no() {
    this.referent = false;
  }

  //---------

  @tracked parking = null;

  get parking_confirmed() { return this.parking !== null }

  @action parking_click_a() {
    this.parking = "TRAILER_A";
  }

  @action parking_click_bc() {
    this.parking = "TRAILER_BC";
  }

  @action parking_click_hangar() {
    this.parking = "HANGAR";
  }

  @action parking_click_other() {
    this.parking = "OTHER";
  }

  @action submit() {

    this.wizard.aircraft_changes.push({
      op: 'ADD',
      registration: this.registration,
      parking: this.parking,
      referent: this.referent,
    });

    this.wizard.next('rules');
  }

  @action back() {
    this.wizard.prev();
  }
}
