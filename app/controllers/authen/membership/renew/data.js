import Controller from '@ember/controller';
import { service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import SelectedService from 'acao-services/utils/selected-service';
import $ from 'jquery';

export default class AuthenMembershipRenewDataController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard;

  @tracked enable_cav = true;
  @tracked enable_email = true;
  @tracked accept_rules = false;
  @tracked payment_method;

  @tracked services = A();

  get service_types_opts() {
    return this.context.service_types.sortBy('name').
             filter((x) => (x.available_for_membership_renewal)).
             map((x) => ({ service_type: x, name: x.name }));
  }

  @action service_set(service, sel) {
    service.type = sel.service_type;
  }


  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }

  get ass_service() {
    return this.context.service_types.findBy('symbol', this.context.ass_type);
  }

  get cav_service() {
    return this.enable_cav ? this.context.service_types.findBy('symbol', this.context.cav_type) : null;
  }

  @action enable_cav_set(ev) {
    this.enable_cav = ev.target.checked;
  }

  get total() {
    return this.ass_service.price +
           (this.enable_cav ? this.cav_service.price : 0) +
           this.services.reduce((previous, service) => (
             previous + (service.type ? service.type.price : 0)
           ), 0);
  }

  get form_invalid() {
    return !this.accept_rules ||
           !this.payment_method;
  }

  get submit_disabled() { return this.form_invalid; }

  get payment_wire() { return this.payment_method == 'WIRE'; }
  get payment_check() { return this.payment_method == 'CHECK'; }
  get payment_card() { return this.payment_method == 'CARD'; }

  @action open_rules() {
    $('.rules-modal').modal('show');
  }

  @action service_add() {
    this.services.addObject(new SelectedService({ type: null }));
  }

  @action service_del(index) {
    this.services.removeAt(index);
  }

  @action set_service_type(index, service_type_id) {
    this.services[index].type = this.store.peekRecord('ygg--acao--service-type', service_type_id);
  }

  @action enable_email_set(ev) {
    this.enable_email = ev.target.checked;
  }

  @action accept_rules_set(ev) {
    this.accept_rules = ev.target.checked;
  }

  @action payment_method_set(value) {
console.log(value);
    this.payment_method = value;
  }


  @action submit() {
    var me = this;

    this.state.services = this.services.filter((x) => (x.type));

console.log("PROCEED", this.getProperties( 'enable_cav', 'enable_email', 'accept_rules', 'payment_method'));

    this.state.setProperties(this.getProperties(
      'enable_cav', 'enable_email', 'accept_rules', 'payment_method',
    ));

    this.router.transitionTo('authen.membership.renew.roster');
  }
}
