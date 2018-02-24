import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),

  isPending: equal('model.payment.state', 'PENDING'),
  isPaid: equal('model.payment.state', 'PAID'),
  isCanceled: equal('model.payment.state', 'CANCELED'),

  forMembership: computed('model.{payment,memberships.@each}', function() {
    return this.get('model.memberships').find((item) =>
      (item.get('payment.id') == this.get('model.payment.id')));
  }),
});
