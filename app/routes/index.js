import Route from '@ember/routing/route';
import { service } from '@ember/service';
import config from 'acao-services/config/environment';

export default class IndexRoute extends Route {
  @service session;
  @service router;

  beforeModel() {
    this.router.transitionTo(config.main_route);
  }
}
