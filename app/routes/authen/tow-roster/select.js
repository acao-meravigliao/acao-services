import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { service } from '@ember/service';

export default class AuthenTowRosterSelectRoute extends Route {
  @service session;
  @service store;

  model(params) {
    return hash({
      rosterEntries: this.store.query('ygg--acao--tow-roster-entry', { filter: { person_id: this.get('session.person_id') } }),
      rosterDays: this.store.findAll('ygg--acao--tow-roster-day'),
    });
  }
}
