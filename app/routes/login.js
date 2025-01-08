import Route from '@ember/routing/route';
import { service } from '@ember/service';
import config from 'acao-services/config/environment';

export default class LoginRoute extends Route {
  @service vos;
  @service router;
  @service session;

  beforeModel(transition) {
    if (this.session.is_authenticated) {
      // No need to be here, go to the index for authenticated people
      this.router.transitionTo(config.main_route);
    } else {
      return this._super(...arguments);
    }
  }
}
