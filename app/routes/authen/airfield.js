import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenAirfieldRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('ygg--acao--airfield', params.id);
  }
}
