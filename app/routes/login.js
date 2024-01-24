import Route from '@ember/routing/route';
import { service } from '@ember/service';
import config from 'acao-services/config/environment';

export default class LoginRoute extends Route {
  @service vos;
  @service router;

  beforeModel(transition) {
    if (this.vos.is_authenticated) {
      // No need to be here, go to the ind
      this.router.transitionTo(config.main_route);
    }
  }
}
