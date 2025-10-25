import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenMembershipRenewBioController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;
  @service clock;

  get wizard() { return this.wizard_controller.wizard; }

  get emails() {
    return this.wizard.person.emails.filter((x) => (!x.isDeleted));
  }

  get fixed_phones() {
    return this.wizard.person.contacts.filter((x) => ( !x.isDeleted && x.type === 'phone'));
  }

  get mobiles() {
    return this.wizard.person.contacts.filter((x) => ( !x.isDeleted && x.type === 'mobile'));
  }

  @action submit_yes() {
    this.wizard.next('rules');

/*
    if (this.wizard.aircraft_ownerships.length > 0)
      this.wizard.next('aircraft-owned', { ac: this.wizard.aircraft_ownerships[0].aircraft.id })
    else
      this.wizard.next('roster-select');
*/
  }

  @action submit_no() {
    this.wizard.next('bio-edit');
  }

  @action back() {
    this.wizard.prev();
  }
}
