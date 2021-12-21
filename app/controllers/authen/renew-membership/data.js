import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';

export default class AuthenRenewMembershipDataController extends Controller {
  @service session;
  @controller('authen.renew-membership') wizard;

  @tracked enableCav = true;
  @tracked enableEmail = true;
  @tracked acceptRules = false;
  @tracked paymentMethod;

  @tracked services = A();

  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }

  get assService() {
    return this.context.service_types.findBy('symbol', this.context.ass_type);
  }

  get cavService() {
    return this.enableCav ? this.context.service_types.findBy('symbol', this.context.cav_type) : null;
  }

  get total() {
    return this.assService.price +
           (this.enableCav ? this.cavService.price : 0) +
           this.services.reduce((previous, service) => (
             previous + (service.type ? service.type.price : 0)
           ), 0);
  }

  get serviceTypesSorted() { return this.context.service_types.sortBy('name'); }

  get formInvalid() {
    return !this.acceptRules  || !this.paymentMethod;
  }

  get commitDisabled() { return this.formInvalid; }

  get paymentWire() { return this.paymentMethod == 'WIRE'; }
  get paymentCheck() { return this.paymentMethod == 'CHECK'; }
  get paymentCard() { return this.paymentMethod == 'CARD'; }

  @action openRules() {
    $('.rules-modal').modal('show');
  }

  @action addService() {
    this.services.addObject(EmberObject.create({ type: null }));
  }

  @action removeService(index) {
    this.services.removeAt(index);
  }

  @action setServiceType(index, serviceTypeId) {
    this.services[index].set('type', this.store.peekRecord('ygg--acao--service-type', serviceTypeId));
  }

  @action enableEmailToggled(ev) {
    this.enableEmail = ev.target.checked;
  }

  @action acceptRulesToggled(ev) {
    this.acceptRules = ev.target.checked;
  }

  @action paymentMethodSet(value) {
console.log(value);
    this.paymentMethod = value;
  }


  @action commit() {
    var me = this;

    this.state.services = this.services.filter((x) => (x.type));

console.log("COMMMMMMMMMMMMMMMMMM", this.getProperties( 'enableCav', 'enableEmail', 'acceptRules', 'paymentMethod'));

    this.state.setProperties(this.getProperties(
      'enableCav', 'enableEmail', 'acceptRules', 'paymentMethod',
    ));

    this.transitionToRoute('authen.renew-membership.roster');
  }
}
