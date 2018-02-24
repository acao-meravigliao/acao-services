import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Login',

  session: service('session'),

  beforeModel(transition) {
    if (this.get('session.isAuthenticated'))
      this.transitionTo('index');
  },
});
