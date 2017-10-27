import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),


  isPending: Ember.computed.equal('model.payment.state', 'PENDING'),
  isPaid: Ember.computed.equal('model.payment.state', 'PAID'),
  isCanceled: Ember.computed.equal('model.payment.state', 'CANCELED'),

  total: Ember.computed('model.services.[]', function() {
    return this.model.services.reduce(function(previous, service) {
      return previous + service.get('price');
    }, 0);
  }),
});
