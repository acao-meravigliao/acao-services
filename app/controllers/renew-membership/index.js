import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  clock: Ember.inject.service('my-clock'),

  wizard: Ember.inject.controller('renew-membership'),

  renewIsOpen: Ember.computed('context.opening_time', 'clock.time', function() {
return true;
    return this.get('clock.date') > new Date(this.get('context.opening_time'));
  }),

  paymentIsPending: Ember.computed('context.membership.status', function() {
    return this.get('context.membership.status') == 'WAITING_PAYMENT' &&
           this.get('context.membership.payment_id');
  }),

  myEmails: Ember.computed('model.person.contacts.@each', function() {
    return this.get('model.person.contacts').filterBy('type', 'email');
  }),

  myFixedPhones: Ember.computed('model.person.contacts.@each', function() {
    return this.get('model.person.contacts').filterBy('type', 'phone');
  }),

  myMobiles: Ember.computed('model.person.contacts.@each', function() {
    return this.get('model.person.contacts').filterBy('type', 'mobile');
  }),

  actions: {
    commit() {
      this.transitionToRoute('renew-membership.data');
    },
  },
});
