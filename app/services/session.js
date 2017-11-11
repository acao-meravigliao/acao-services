import Ember from 'ember';
import ESASession from 'ember-simple-auth/services/session';

export default ESASession.extend({

  store: Ember.inject.service(),
  ws: Ember.inject.service('web-socket'),

  personId: Ember.computed('data.authenticated', function() { return this.get('data.authenticated').auth_person.id }),

  isAuthObserver: Ember.observer('isAuthenticated', function() {
    var me = this;

    if (this.get('isAuthenticated')) {
      this.get('store').findRecord('ygg--core--person', this.get('personId')).then(function(person) { me.set('person', person);  });
    } else {
      this.set('person', null);
//      this.set('memberships', null);
    }
  }),

  init() {
    this._super(...arguments);
    this.get('ws').connect();
    this.get('isAuthenticated');
  },
});
