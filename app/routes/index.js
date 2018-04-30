import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { hash, all } from 'rsvp';

export default Route.extend({
  session: service('session'),

  model() {
    return hash({
      payments: this.get('store').query('ygg--acao--payment', { filter: { state: 'PENDING', person_id: this.get('session.personId') } }).then(() => this.store.peekAll('ygg--acao--payment')),
      renewalContext: $.getJSON('/ygg/acao/memberships/renew'),
      memberships: this.get('store').query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }),
      rosterStatus: $.getJSON('/ygg/acao/roster_entries/status'),
      rosterEntries: this.store.query('ygg--acao--roster-entry', { filter: { person_id: this.get('session.personId') } }).then((items) => {
        return all(items.map((l) => l.get('roster_day'))).then(() => items);
      }),
      licenses: this.get('store').query('ygg--acao--license', { filter: { pilot_id: this.get('session.personId') } }),
      medicals: this.get('store').query('ygg--acao--medical', { filter: { pilot_id: this.get('session.personId') } }),


//.filter((item) => {
//console.log("HHHHHHHHHHHH", items);
//        return true;
//      }),
    });
  },

}, AuthenticatedRouteMixin);
