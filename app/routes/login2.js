import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Login2Route extends Route {
  @service session;

  authenticatedRoute = 'authen.index';

  beforeModel(transition) {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo(this.authenticatedRoute);
    } else {
      return this._super(...arguments);
    }
  }
}
