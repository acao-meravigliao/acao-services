import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { VosRelation } from '@vihai/ember-vos';
import { debounce } from '@ember/runloop';

export default class AuthenMembershipRenewAircraftNewController extends Controller {
  @service router;
  @controller('authen.membership.renew') wizard_controller;
  @service vos;

  @tracked enter_aircraft_data = false;

  get wizard() { return this.wizard_controller.wizard; }

  reset() {
    this.another_aircraft = null;
    this.registration = null;
    this.registration_entered = null;
    this.aircraft = null;
    this.referent = null;
    this.parking = null;
  }

  get other_aircraft() {
    return this.wizard.aircraft_ownerships.length > 0;
  }

  // ---------------

  @tracked another_aircraft = null;
  @action another_aircraft_yes_clicked() {
    this.another_aircraft = true;
  }

  @action another_aircraft_no_clicked() {
    this.wizard.next_without_history('rules');
  }

  @tracked registration = '';
  @tracked registration_entered = false;
  @action registration_on_input(ev) {
    debounce(this, this.do_search, ev.target.value, 250);
  }

  @action registration_on_change(ev) {
    this.registration_entered = (ev.target.value !== '');
    this.registration = ev.target.value.trim().toUpperCase();
  }

  @action registration_ok_clicked() {
  }

  get registration_ok_enabled() {
    // Club owned aircraft may not be selected

    return !this.aircraft || !this.aircraft.club_owner; // TODO: do not accept aircraft already created
  }

  @tracked aircraft;

  async do_search(text) {
    if (text.length < 4)
      return;

    const res = await this.vos.select({
      type: 'ygg--acao--aircraft',
      filter: { registration: text },
      dig: [
       {
        from: 'aircraft',
        to: 'aircraft_type',
       },
       {
        from: 'aircraft',
        to: 'club_owner',
       },
      ]
    }, { persistent: false });

    if (res.objs.size > 0) {
      this.aircraft = res.get_first('ygg--acao--aircraft');
    } else {
      this.aircraft = null;
    }
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

  @tracked parking;
  @tracked parking_descr;

  get parking_confirmed() { return this.parking !== null }

  @action parking_click_a() {
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

  @tracked submitting = false;
  @tracked submit_error;

  @action async submit() {
    this.submitting = true;
    this.submit_error = null;

    try {
      const res = await this.vos.class_call('ygg--acao--membership', 'aircraft_ownership_add', {
        aircraft_id: this.aircraft && this.aircraft.id,
        //aircraft_type_id: this.aircraft && this.aircraft.aircraft_type && this.aircraft.aircraft_type.id,
        referent: this.referent,
        registration: this.registration,
        parking: this.parking,
      });
    } catch(e) {
      this.submit_error = e;
      this.submitting = false;
      return;
    }

    this.submitting = false;

    this.reset();
  }

  @action back() {
    history.back();
//    this.wizard.prev();
  }
}
