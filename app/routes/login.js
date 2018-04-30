import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Login',

  session: service('session'),

  authenticatedRoute: 'index',

  beforeModel(transition) {
    // Trigger session loading if not loaded already, if authenticated jump to index

    if (!this.get('session.isLoaded')) {
      this.get('session').load().then((response) => {
        if (this.get('session.isAuthenticated'))
          this.transitionTo(this.get('authenticatedRoute'));
        else
          return this._super(...arguments);
      });
    } else if (this.get('session.isAuthenticated')) {
      this.transitionTo(this.get('authenticatedRoute'));
    } else {
      return this._super(...arguments);
    }
  },
});
