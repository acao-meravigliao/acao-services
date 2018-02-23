import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
  session: service('session'),

  isPending: Ember.computed.equal('model.payment.state', 'PENDING'),
  isPaid: Ember.computed.equal('model.payment.state', 'PAID'),
  isCanceled: Ember.computed.equal('model.payment.state', 'CANCELED'),

  forMembership: Ember.computed('model.payment', 'model.memberships.@each', function() {
    return this.get('model.memberships').find((item) =>
      (item.get('payment.id') == this.get('model.payment.id')));
  }),
});
