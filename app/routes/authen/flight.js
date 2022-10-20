import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenFlightRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('ygg--acao--flight', params.id);
  }
}
