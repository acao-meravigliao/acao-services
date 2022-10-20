import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenTokenTransactionRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('ygg--acao--token-transaction', params.id);
  }
}
