import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash, all } from 'rsvp';

export default class AuthenIndexRoute extends Route {
  @service session;
  @service store;

  model() {
    return hash({
      rosterEntries: this.store.query('ygg--acao--roster-entry',
                       { filter: { person_id: this.get('session.person_id') } },
                       { adapterOptions: { view: 'with_days' } }).then((items) => {
        return all(items.map((l) => l.get('roster_day'))).then(() => items);
      }),
    });
  }
}
