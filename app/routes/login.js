import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Login',

  session: Ember.inject.service('session'),

  beforeModel(transition) {
    if (this.get('session.isAuthenticated'))
      this.transitionTo('index');
  },
});
