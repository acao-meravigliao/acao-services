import $ from 'jquery';
import { sort, alias, equal } from '@ember/object/computed';
import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  assService: computed('model.serviceTypes', 'context.ass_type', function() {
    return this.get('model.serviceTypes').findBy('symbol', this.get('context.ass_type'));
  }),

  cavService: computed('model.serviceTypes', 'context.cav_type', 'enableCav', function() {
    return this.enableCav ? this.get('model.serviceTypes').findBy('symbol', this.get('context.cav_type')) : null;
  }),

  total: computed('context.{membershipAmount,cavAmount}', 'enableCav', 'services.@each.type', function() {
    return this.get('assService.price') +
           (this.enableCav ? this.get('cavService.price') : 0) +
           this.services.reduce(function(previous, service) {
             return previous + (service.get('type') ? service.get('type.price') : 0);
           }, 0);
  }),

  services: A(),

  serviceTypesSorted: sort('model.serviceTypes', 'serviceTypesSortOrder'),

  formInvalid: computed('acceptRules', 'paymentMethod', function() {
    return !this.acceptRules  || !this.paymentMethod;
  }),

  commitDisabled: alias('formInvalid'),

  paymentWire: equal('paymentMethod', 'wire'),
  paymentCheck: equal('paymentMethod', 'check'),
  paymentCard: equal('paymentMethod', 'card'),

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

      this.state.setProperties(this.getProperties(
        'services', 'enableCav', 'enableEmail', 'acceptRules', 'paymentMethod',
      ));

      this.transitionToRoute('renew-membership.summary');
    },
  },
});
