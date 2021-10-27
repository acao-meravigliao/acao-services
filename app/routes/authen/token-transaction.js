import Route from '@ember/routing/route';

export default class AuthenTokenTransactionRoute extends Route {
  model(params) {
    return this.store.findRecord('ygg--acao--token-transaction', params.id);
  }
}
