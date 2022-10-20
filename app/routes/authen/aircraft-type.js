import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenAircraftTypeRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('ygg--acao--aircraft-type', params.id);
  }
}
