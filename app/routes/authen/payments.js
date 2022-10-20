import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenPaymentsRoute extends Route {
  @service store;

  model() {
    return this.store.peekAll('ygg--acao--payment');
  }
}
