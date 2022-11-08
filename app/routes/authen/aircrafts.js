import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenAircraftsRoute extends Route {
  @service session;
  @service store;

  model(params) {
    return this.store.query('ygg--acao--aircraft', { filter: { person_id: this.session.person_id, } });
  }
}
