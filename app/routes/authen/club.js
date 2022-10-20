import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenClubRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('ygg--acao--club', params.id);
  }
}
