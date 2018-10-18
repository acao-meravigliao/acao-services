import Route from '@ember/routing/route';
import { hash, all } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      rosterEntries: this.store.query('ygg--acao--roster-entry', { filter: { person_id: this.get('session.personId') } }).then((items) => {
        return all(items.map((l) => l.get('roster_day'))).then(() => items);
      }),
    });
  },

});
