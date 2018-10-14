import Route from '@ember/routing/route';
import { hash, all } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      //payments: this.store.query('ygg--acao--payment', { filter: { state: 'PENDING', person_id: this.get('session.personId') } }),
      //renewalContext: $.getJSON('/ygg/acao/memberships/renew'),
      //memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }),
      rosterEntries: this.store.query('ygg--acao--roster-entry', { filter: { person_id: this.get('session.personId') } }).then((items) => {
        return all(items.map((l) => l.get('roster_day'))).then(() => items);
      }),
      //licenses: this.store.query('ygg--acao--license', { filter: { pilot_id: this.get('session.personId') } }),
      //medicals: this.store.query('ygg--acao--medical', { filter: { pilot_id: this.get('session.personId') } }),
    });
  },

});
