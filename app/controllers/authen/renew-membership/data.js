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

  services = A();
  serviceTypesSortOrder = ['name'];

  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }

  get assService() {
    return this.get('wizard.serviceTypes').findBy('symbol', this.get('context.ass_type'));
  }

  get cavService() {
    return this.enableCav ? this.get('wizard.serviceTypes').findBy('symbol', this.get('context.cav_type')) : null;
  }

  get total() {
    return this.get('assService.price') +
           (this.enableCav ? this.get('cavService.price') : 0) +
           this.services.reduce(function(previous, service) {
             return previous + (service.get('type') ? service.get('type.price') : 0);
           }, 0);
  }

  get serviceTypesSorted() { return this.wizard.serviceTypes.sortBy('serviceTypesSortOrder'); }

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

    this.transitionToRoute('authen.renew-membership.summary');
  }
}
