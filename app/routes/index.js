import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  model() {
    return Ember.RSVP.hash({
      pendingPayments: this.get('store').query('ygg--acao--payment', { filter: { state: 'PENDING', person_id: this.get('session.personId') } }),
      renewalContext: Ember.$.getJSON('/ygg/acao/memberships/renew'),
      memberships: this.get('store').query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }),
      rosterStatus: Ember.$.getJSON('/ygg/acao/roster_entries/status'),
      rosterEntries: this.store.query('ygg--acao--roster-entry', { filter: { person_id: this.get('session.personId') } }).then((items) => {
        return Ember.RSVP.all(items.map((l) => l.get('roster_day'))).then(() => items);
      }),


//.filter((item) => {
//console.log("HHHHHHHHHHHH", items);
//        return true;
//      }),
    });
  },

}, AuthenticatedRouteMixin);
