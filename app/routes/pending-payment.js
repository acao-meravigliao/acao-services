import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  mainTitle: 'Pagamenti pendenti',

  model(params) {
    return Ember.RSVP.hash({
      payment: this.get('store').findRecord('ygg--acao--payment', params.id),
      services: this.get('store').query('ygg--acao--payment--service', { filter: { payment_id: params.id }}),
    });
  },

}, AuthenticatedRouteMixin);
