import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipRenewAircraftOwnedController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  get wizard() { return this.wizard_controller.wizard; }

  get aircraft() {
    return this.model.aircraft;
  }

  reset() {
    this.user = null;
    this.referent = null;
    this.parking = null;
  }

  @tracked user;

  get user_confirmed() { return this.user !== null }

  @action user_click_yes() {
    this.user = true;
  }

  @action user_click_no() {
    this.user = false;

    this.wizard.aircraft_changes.push({
      op: 'REMOVE',
      id: this.aircraft.id,
    });

    this.goto_next();
  }

  @tracked referent;

  get referent_confirmed() { return this.referent !== null }

  @action referent_click_yes() {
    this.referent = true;
  }

  @action referent_click_no() {
    this.referent = false;
  }

  @tracked parking;
  @tracked parking_descr;

  get parking_confirmed() { return this.parking !== null }

  @action parking_click_a(ev) {
    this.parking = "TRAILER_A";
    this.parking_descr = 'Carrello Zona A';
  }

  @action parking_click_bc() {
    this.parking = "TRAILER_BC";
    this.parking_descr = 'Carrello Zona B/C';
  }

  @action parking_click_hangar() {
    this.parking = "HANGAR";
    this.parking_descr = 'Hangar';
  }

  @action parking_click_other() {
    this.parking = "OTHER";
    this.parking_descr = 'Altro';
  }

  @action submit() {
    if (this.user) {
      this.wizard.aircraft_changes.push({
        op: 'UPDATE',
        id: this.aircraft.id,
        parking: this.parking,
        referent: this.referent,
      });
    }

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
