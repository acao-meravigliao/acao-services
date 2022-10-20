import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenInvoicesRoute extends Route {
  @service session;
  @service store;

  model(params) {
    return this.store.query('ygg--acao--invoice', { filter: { person_id: this.session.person_id, } });
  }
}
