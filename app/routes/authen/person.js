import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenPersonRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('ygg--core--person', params.id);
  }
}
