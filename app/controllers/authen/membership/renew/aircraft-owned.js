import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipRenewAircraftOwnedController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  @tracked ownership_confirmed = false;
  @tracked referent_confirmed = false;

  get wizard() { return this.wizard_controller.wizard; }

  get aircraft() {
    return this.model.aircraft;
  }

  @action ownership_click_yes() {
    this.ownership_confirmed = true;
  }

  @action ownership_click_no() {
    this.ownership_confirmed = false;

    // XXX Record removed aircraft

    this.goto_next();
  }

  @action referent_click_yes() {
    this.referent_confirmed = true;
  }

  @action referent_click_no() {
    this.referent_confirmed = false;
  }

  @tracked parking_confirmed = false;
  @tracked parking;

  @action parking_click_a() {
    this.parking_confirmed = true;
    this.parking = "Carrello Area A";
  }

  @action parking_click_bc() {
    this.parking_confirmed = true;
    this.parking = "Carrello Area BC";
  }

  @action parking_click_hangar() {
    this.parking_confirmed = true;
    this.parking = "Hangar";
  }

  @action parking_click_other() {
    this.parking_confirmed = true;
    this.parking = "Altro";
  }

  @action submit() {
    this.goto_next();
  }

  goto_next() {
    const idx = this.wizard.aircraft_ownerships.findIndex((x) => (x.aircraft.id === this.aircraft.id));

    if (idx < this.wizard.aircraft_ownerships.length - 1)
      this.wizard.next('aircraft-owned', { ac: this.wizard.aircraft_ownerships[idx + 1].aircraft.id })
    else
      this.wizard.next('aircraft-new');
  }

  @action back() {
    this.wizard.prev();
  }
}
