import Route from '@ember/routing/route';
import { hash, all } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenIndexRoute extends Route {
  @service session;

  model() {
    return hash({
      rosterEntries: this.store.query('ygg--acao--roster-entry',
                       { filter: { person_id: this.get('session.personId') } },
                       { adapterOptions: { view: 'with_days' } }).then((items) => {
        return all(items.map((l) => l.get('roster_day'))).then(() => items);
      }),
    });
  }
}
