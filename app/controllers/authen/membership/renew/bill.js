import Controller from '@ember/controller';
import { service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import SelectedService from 'acao-services/utils/selected-service';

export default class AuthenMembershipRenewBillController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  @tracked email_allowed = true;

  get wizard() { return this.wizard_controller.wizard; }

  get services() { return this.wizard.services; }

  get service_types_opts() {
    return this.wizard.service_types.sort((a,b) => (a.name.localeCompare(b.name))).
             filter((x) => (x.available_for_membership_renewal)).
             map((x) => ({ service_type: x, name: x.name }));
  }

  @action service_set(service, sel) {
    service.type = sel.service_type;
  }

  @action service_set_extra_info(service, el) {
    service.extra_info = el.target.value;
  }

  get total() {
    return this.services.reduce((previous, service) => (
             previous + ((service.type && service.enabled) ? service.type.price : 0)
           ), 0);
  }

  get submit_disabled() { return this.form_invalid; }

  @action service_add() {
    this.services.addObject(new SelectedService({
      type: null,
      type_changeable: true,
      enabled: true,
      removable: true,
      toggable: false,
    }));
  }

  @action service_del(index) {
    this.services.removeAt(index);
  }

  @action set_service_type(index, service_type_id) {
    this.services[index].type = this.store.peekRecord('ygg--acao--service-type', service_type_id);
  }

  @action service_toggle(index) {
    this.services[index].enabled = !this.services[index].enabled;
  }

  @action email_allowed_set(ev) {
    this.email_allowed = ev.target.checked;
  }

  @action submit() {
    this.wizard.update({
      services: this.services,
    });

    this.wizard.next('roster-select');
  }

  @action back() {
    this.wizard.prev();
  }
}
