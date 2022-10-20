import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenClubsRoute extends Route {
  @service store;

  model(params) {
    return this.findAll('ygg--acao--club');
  }
}
