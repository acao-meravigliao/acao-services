import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  wizard: controller('logged-in.renew-membership'),
  context: alias('wizard.context'),
  state: alias('wizard.state'),
  session: service('session'),

  clock: service('my-clock'),

  renewIsOpen: alias('wizard.renewIsOpen'),

  paymentIsPending: computed('context.current.membership.status', function() {
    return this.get('context.current.membership.status') == 'WAITING_PAYMENT' &&
           this.get('context.current.membership.payment_id');
  }),

  myEmails: computed('wizard.person.contacts.@each', function() {
    return this.get('wizard.person.contacts').filterBy('type', 'email');
  }),

  myFixedPhones: computed('wizard.person.contacts.@each', function() {
    return this.get('wizard.person.contacts').filterBy('type', 'phone');
  }),

  myMobiles: computed('wizard.person.contacts.@each', function() {
    return this.get('wizard.person.contacts').filterBy('type', 'mobile');
  }),

  actions: {
    commit() {
      this.transitionToRoute('logged-in.renew-membership.data');
    },
  },
});
