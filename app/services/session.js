import { computed, observer } from '@ember/object';
import ESASession from 'ember-simple-auth/services/session';
import { inject as service } from '@ember/service';

export default ESASession.extend({

  store: service(),
  ws: service('web-socket'),

  personId: computed('data.authenticated', function() { return this.get('data.authenticated').auth_person.id }),

  isAuthObserver: observer('isAuthenticated', function() {
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
