import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import { sort, alias, equal } from '@ember/object/computed';
import { A } from '@ember/array';
import $ from 'jquery';

export default Controller.extend({
  wizard: controller('authen.renew-membership'),
  context: alias('wizard.context'),
  state: alias('wizard.state'),

  services: A(),

  assService: computed('wizard.serviceTypes', 'context.ass_type', function() {
    return this.get('wizard.serviceTypes').findBy('symbol', this.get('context.ass_type'));
  }),

  cavService: computed('wizard.serviceTypes', 'context.cav_type', 'enableCav', function() {
    return this.enableCav ? this.get('wizard.serviceTypes').findBy('symbol', this.get('context.cav_type')) : null;
  }),

  total: computed('context.{membershipAmount,cavAmount}', 'enableCav', 'services.@each.type', function() {
    return this.get('assService.price') +
           (this.enableCav ? this.get('cavService.price') : 0) +
           this.services.reduce(function(previous, service) {
             return previous + (service.get('type') ? service.get('type.price') : 0);
           }, 0);
  }),

  serviceTypesSorted: sort('wizard.serviceTypes', 'serviceTypesSortOrder'),

  formInvalid: computed('acceptRules', 'paymentMethod', function() {
    return !this.acceptRules  || !this.paymentMethod;
  }),

  commitDisabled: alias('formInvalid'),

  paymentWire: equal('paymentMethod', 'WIRE'),
  paymentCheck: equal('paymentMethod', 'CHECK'),
  paymentCard: equal('paymentMethod', 'CARD'),

  init() {
    this._super(...arguments);
    this.serviceTypesSortOrder = ['name'];
  },

  actions: {
    openRules() {
      $('.rules-modal').modal('show');
    },

    addService() {
      this.services.addObject(EmberObject.create({ type: null }));
    },

    removeService(index) {
      this.services.removeAt(index);
    },

    setServiceType(index, serviceTypeId) {
      this.services[index].set('type', this.store.peekRecord('ygg--acao--service-type', serviceTypeId));
    },

    commit() {
      var me = this;

      this.state.services = this.get('services').filter((x) => (x.type));

      this.state.setProperties(this.getProperties(
        'enableCav', 'enableEmail', 'acceptRules', 'paymentMethod',
      ));

      this.transitionToRoute('authen.renew-membership.summary');
    },
  },
});
