import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  total: Ember.computed('context.membershipAmount', 'context.cavAmount', 'enableCav', 'services.@each.type', function() {
    var me = this;

    return this.get('context.membershipAmount') +
           (this.get('enableCav') ? this.get('context.cavAmount') : 0) +
           this.get('services').reduce(function(previous, service) {
             return service.type ? (previous + me.get('context.availableServices')[service.type].price) : previous;
           }, 0);
  }),

  formInvalid: Ember.computed('acceptRules', 'paymentMethod', function() {
    return !this.get('acceptRules')  || !this.get('paymentMethod');
  }),

  renewForYear: (new Date()).getFullYear() + 1,

  services: Ember.A(),

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
        url: '/ygg/acao/renew_membership/prepare_payment',
        data: JSON.stringify(this.get('state')),
        dataType: 'json',
        contentType: 'application/json',
      }).then(function(response) {
        me.set('submitting', false);

        me.get('state').setProperties({
          backendComputedTotal: response.backendComputedTotal,
          paymentCode: response.paymentCode,
        });

        me.transitionToRoute('renew-membership.payment-' + me.get('paymentMethod'));

      }, function(xhr, status, error) {
        me.set('submitting', false);
      });
    },
  },
});
