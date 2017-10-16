import DS from 'ember-data';
import ESASession from 'ember-simple-auth/services/session';

export default ESASession.extend({

  store: Ember.inject.service(),
  ws: Ember.inject.service('web-socket'),

  enableRenew: Ember.computed('memberships.[]', function() {
    if (this.get('memberships'))
      return this.get('memberships').every(function(membership) { return membership.get('year') != ((new Date()).getFullYear() + 1); } );
    else
      return false;
  }),

  isAuthObserver: Ember.observer('isAuthenticated', function() {
    var me = this;

    if (this.get('isAuthenticated')) {
      this.get('store').findRecord('person', this.get('data.authenticated.auth_person.id')).then(function(person) { me.set('person', person);  });
      this.get('store').query('membership', { filter: { person_id: this.get('data.authenticated.auth_person.id') } }).then(function(memberships) { me.set('memberships', memberships);  });
    } else {
      this.set('person', null);
      this.set('memberships', null);
    }
  }),

  init() {
    this._super(...arguments);
    this.get('ws').connect();
    this.get('isAuthenticated');
  },
});
