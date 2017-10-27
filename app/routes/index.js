import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  model() {
    return Ember.RSVP.hash({
      pendingPayments: this.get('store').query('ygg-acao-payment', { status: 'PENDING' }),
      renewalContext: Ember.$.getJSON('/ygg/acao/renew_membership/context'),
      memberships: this.get('store').query('ygg-acao-membership', { filter: { person_id: this.get('session.data.authenticated.auth_person.id') } }),
    });
  },

}, AuthenticatedRouteMixin);
