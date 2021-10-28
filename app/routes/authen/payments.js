import Route from '@ember/routing/route';

export default class AuthenPaymentsRoute extends Route {
  model() {
    return this.store.peekAll('ygg--acao--payment');
  }
}
