import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setLocale('it');
  },

  actions: {
//    error(error, transition) {
//      return true;
//    },
  },

}, ApplicationRouteMixin);
