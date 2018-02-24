import { computed } from '@ember/object';
import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),
  clock: service('my-clock'),

  wizard: controller('renew-membership'),

  renewIsOpen: computed('context.opening_time', 'clock.time', function() {
    return this.get('clock.date') > new Date(this.get('context.opening_time'));
  }),

  paymentIsPending: computed('context.membership.status', function() {
    return this.get('context.membership.status') == 'WAITING_PAYMENT' &&
           this.get('context.membership.payment_id');
  }),

  myEmails: computed('model.person.contacts.@each', function() {
    return this.get('model.person.contacts').filterBy('type', 'email');
  }),

  myFixedPhones: computed('model.person.contacts.@each', function() {
    return this.get('model.person.contacts').filterBy('type', 'phone');
  }),

  myMobiles: computed('model.person.contacts.@each', function() {
    return this.get('model.person.contacts').filterBy('type', 'mobile');
  }),

  actions: {
    commit() {
      this.transitionToRoute('renew-membership.data');
    },
  },
});
