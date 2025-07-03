import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenTokenTransactionRoute extends BaseRoute {
  @service store;

  model(params) {
    return this.store.findRecord('ygg--acao--token-transaction', params.id);
  }
}
