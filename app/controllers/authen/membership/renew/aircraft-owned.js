import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipRenewAircraftOwnedController extends Controller {
  @service router;
  @controller('authen.membership.renew') wizard_controller;
  @service vos;

  get wizard() { return this.wizard_controller.wizard; }

  get esel() { return this.model.esel; }

  get aircraft_owner() {
    return this.model.aircraft_owner;
  }

  get aircraft() {
    return this.aircraft_owner.aircraft;
  }

  reset() {
    this.current_idx = this.wizard.aircraft_ownerships.findIndex((x) => (x.id === this.aircraft_owner.id));

    this.user_confirmed = false;
    this.role_confirmed = false;
    this.parking_confirmed = false;
  }

  @tracked user_confirmed;

  @action user_click_yes() {
    this.user_confirmed = true;
  }

  @action async user_click_no() {
    this.user_confired = true;

    try {
      const res = await this.vos.class_call('ygg--acao--membership', 'aircraft_ownership_remove', {
        ownership_id: this.aircraft_owner.id,
      });
    } catch(e) {
      this.submit_error = e;
      return;
    }

    this.goto_next();
  }

  @tracked role_confirmed;

  @action role_click_yes() {
    this.aircraft_owner.role = 'OWNER';
    this.role_confirmed = true;
  }

  @action role_click_no() {
    this.aircraft_owner.role = 'USER';
    this.role_confirmed = true;
  }

  @tracked parking_confirmed;
  @tracked parking_descr;

  @action parking_click_a(ev) {
    this.parking_confirmed = true;
    this.parking_descr = 'Carrello Zona A';
    this.aircraft.parking = "TRAILER_A";
  }

  @action parking_click_bc() {
    this.parking_confirmed = true;
    this.parking_descr = 'Carrello Zona B/C';
    this.aircraft.parking = "TRAILER_BC";
  }

  @action parking_click_hangar() {
    this.parking_confirmed = true;
    this.parking_descr = 'Hangar';
    this.aircraft.parking = "HANGAR";
  }

  @action parking_click_other() {
    this.parking_confirmed = true;
    this.parking_descr = 'Altro';
    this.aircraft.parking = "OTHER";
  }

get pippo() {
  return JSON.stringify(this.esel.compute_changes(this.wizard.context_sel));
}

  @tracked submitting = false;
  @tracked submit_error;

  @action async submit() {
    const changes = this.esel.compute_changes(this.wizard.context_sel);

    if (changes.length > 0) {
      try {
        const res = await this.vos.class_call('ygg--acao--membership', 'aircraft_ownership_update', {
          ownership_id: this.aircraft_owner.id,
          role: this.aircraft_owner.role,
          parking: this.aircraft.parking,
        });
      } catch(e) {
        this.submit_error = e;
        this.submitting = false;
        return;
      }

      this.submitting = false;
    }

    this.goto_next();
  }

  goto_next() {
    if (this.current_idx < this.wizard.aircraft_ownerships.length - 1)
      this.wizard.next('aircraft-owned', { aco: this.wizard.aircraft_ownerships[this.current_idx + 1].id })
    else
      this.wizard.next('aircraft-new');
  }

  @action back() {
    history.back();
    //this.wizard.prev();
  }
}
