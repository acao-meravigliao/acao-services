import Route from '@ember/routing/route';

export default class AuthenBarTransactionRoute extends Route {
  model(params) {
    return this.store.findRecord('ygg--acao--bar-transaction', params.id);
  }
}
