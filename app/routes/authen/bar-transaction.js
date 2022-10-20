import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenBarTransactionRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('ygg--acao--bar-transaction', params.id);
  }
}
