import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  clock: Ember.inject.service('my-clock'),

  wizard: Ember.inject.controller('renew-membership'),

  renewIsOpen: Ember.computed('context.renew_opening_time', 'clock.time', function() {
    return this.get('clock.date') > new Date(this.get('context.renew_opening_time'));
  }),

  paymentIsPending: Ember.computed('context.membership.status', function() {
    return this.get('context.membership.status') == 'WAITING_PAYMENT' &&
           this.get('context.membership.payment_id');
  }),

  actions: {
    commit() {
      this.transitionToRoute('renew-membership.data');
    },
  },
});
