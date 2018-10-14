import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),

  authenticatedRoute: 'logged-in.index',

  beforeModel(transition) {
    // Trigger session loading if not loaded already, if authenticated jump to index

    if (!this.get('session.isLoaded')) {
      this.session.load().then((response) => {
        if (this.get('session.isAuthenticated'))
          this.transitionTo(this.authenticatedRoute);
        else
          return this._super(...arguments);
      });
    } else if (this.get('session.isAuthenticated')) {
      this.transitionTo(this.authenticatedRoute);
    } else {
      return this._super(...arguments);
    }
  },
});
