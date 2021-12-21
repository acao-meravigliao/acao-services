import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenInvoicesRoute extends Route {
  @service session;

  model(params) {
    return this.store.query('ygg--acao--invoice', { filter: { person_id: this.get('session.personId'), } });
  }
}
