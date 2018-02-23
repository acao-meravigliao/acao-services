import Ember from 'ember';

export default Ember.Controller.extend({
  assService: Ember.computed('model.serviceTypes', 'context.ass_type', function() {
    return this.get('model.serviceTypes').findBy('symbol', this.get('context.ass_type'));
  }),

  cavService: Ember.computed('model.serviceTypes', 'context.cav_type', 'enableCav', function() {
    return this.get('enableCav') ? this.get('model.serviceTypes').findBy('symbol', this.get('context.cav_type')) : null;
  }),

  total: Ember.computed('context.membershipAmount', 'context.cavAmount', 'enableCav', 'services.@each.type', function() {
    return this.get('assService.price') +
           (this.get('enableCav') ? this.get('cavService.price') : 0) +
           this.get('services').reduce(function(previous, service) {
             return previous + (service.get('type') ? service.get('type.price') : 0);
           }, 0);
  }),

  services: Ember.A(),

  serviceTypesSortOrder: ['name'],
  serviceTypesSorted: Ember.computed.sort('model.serviceTypes', 'serviceTypesSortOrder'),

  formInvalid: Ember.computed('acceptRules', 'paymentMethod', function() {
    return !this.get('acceptRules')  || !this.get('paymentMethod');
  }),

  commitDisabled: Ember.computed.alias('formInvalid'),

  paymentWire: Ember.computed.equal('paymentMethod', 'wire'),
  paymentCheck: Ember.computed.equal('paymentMethod', 'check'),
  paymentCard: Ember.computed.equal('paymentMethod', 'card'),

  actions: {
    openRules() {
      Ember.$('.rules-modal').modal('show');
    },

    addService() {
      this.get('services').addObject(Ember.Object.create({ type: null }));
    },

    removeService(index) {
      this.get('services').removeAt(index);
    },

    setServiceType(index, serviceTypeId) {
      this.get('services')[index].set('type', this.get('store').peekRecord('ygg--acao--service-type', serviceTypeId));
    },

    commit() {
      var me = this;

      this.get('state').setProperties(this.getProperties(
        'services', 'enableCav', 'enableEmail', 'acceptRules', 'paymentMethod',
      ));

      this.transitionToRoute('renew-membership.summary');
    },
  },
});
