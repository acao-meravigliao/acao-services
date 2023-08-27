import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenBarTransactionsRoute extends Route {
  @service store;
  @service session;

  model(params) {
    return this.store.query('ygg--acao--bar-transaction', { filter: { person_id: this.session.person_id }});
  }
}
