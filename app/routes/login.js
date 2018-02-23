import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Route.extend({
  titleToken: 'Login',

  session: service('session'),

  beforeModel(transition) {
    if (this.get('session.isAuthenticated'))
      this.transitionTo('index');
  },
});
