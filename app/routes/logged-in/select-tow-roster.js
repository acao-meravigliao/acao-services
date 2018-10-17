import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    return hash({
      rosterEntries: this.store.query('ygg--acao--tow-roster-entry', { params: { filter: { person_id: this.get('session.personId') } } }),
      rosterDays: this.store.findAll('ygg--acao--tow-roster-day'),
    });
  },
});
