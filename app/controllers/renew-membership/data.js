import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  total: Ember.computed('context.membershipAmount', 'context.cavAmount', 'enableCav', 'services.@each.type', function() {
    var me = this;
    let ava = me.get('serviceBySymbol');

    return ava[this.get('context.ass_type')].get('price') +
           (this.get('enableCav') ? ava[this.get('context.cav_type')].get('price') : 0) +
           this.get('services').reduce(function(previous, service) {
             return service.type ? (previous + ava[service.type].get('price')) : previous;
           }, 0);
  }),

  formInvalid: Ember.computed('acceptRules', 'paymentMethod', function() {
    return !this.get('acceptRules')  || !this.get('paymentMethod');
  }),

  services: Ember.A(),
//  sortByNameAsc: ['name'],
//  serviceTypesSorted: Ember.computed.sort('model.serviceTypes', 'sortByNameAsc'),
  serviceTypesSorted: Ember.computed.alias('model.serviceTypes'),

  serviceBySymbol: Ember.computed('model.serviceTypes', 'model.serviceTypes.@each', function() {
    let services = {};

    this.get('model.serviceTypes').forEach(function(st) {
      services[st.get('symbol')] = st;
    });

    return services;
  }),

  actions: {
    addService() {
      this.get('services').addObject(Ember.Object.create({ type: null }));
    },

    removeService(index) {
      this.get('services').removeAt(index);
    },

    setService(index, value) {
      this.get('services')[index].set('type', value);
    },

    setServiceExtraInfo(index, value) {
      this.get('services')[index].set('extraInfo', value);
    },

    commit() {
      var me = this;

      this.get('state').setProperties(this.getProperties(
        'services', 'enableCav', 'enableEmail', 'acceptRules', 'paymentMethod',
      ));

      me.set('submitting', true);

      Ember.$.ajax({
        type: 'POST',
        url: '/ygg/acao/memberships/renew',
        data: JSON.stringify(this.get('state')),
        dataType: 'json',
        contentType: 'application/json',
      }).then(function(response) {
        me.set('submitting', false);

        me.transitionToRoute('pending-payment', response.payment_id);

      }, function(xhr, status, error) {
        me.set('submitting', false);
      });
    },
  },
});
