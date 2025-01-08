import Controller from '@ember/controller';
import { service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import SelectedService from 'acao-services/utils/selected-service';

export default class AuthenMembershipRenewDataController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  @tracked enable_email = true;
  @tracked accept_rules = false;
  @tracked payment_method;

  get wizard() { return this.wizard_controller.wizard; }

  get services() { return this.model.services }

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

  get form_invalid() {
    return !this.accept_rules ||
           !this.payment_method;
  }

  get submit_disabled() { return this.form_invalid; }

  get payment_wire() { return this.payment_method === 'WIRE'; }
  get payment_check() { return this.payment_method === 'CHECK'; }
  get payment_card() { return this.payment_method === 'CARD'; }

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

  @action enable_email_set(ev) {
    this.enable_email = ev.target.checked;
  }

  @action accept_rules_set(ev) {
    this.accept_rules = ev.target.checked;
  }

  @action payment_method_set(value) {
    this.payment_method = value;
  }


  @action submit() {
    this.wizard.services = this.services;

    this.wizard.setProperties(this.getProperties(
      'enable_email', 'accept_rules', 'payment_method',
    ));

    this.wizard.next('roster');
  }

  @action back() {
    this.wizard.prev();
  }
}
