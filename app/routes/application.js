import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';

export default Ember.Route.extend({
  session: service('session'),

  moment: service(),
  beforeModel() {
    this.get('moment').setLocale('it');
  },

  title: function(tokens) {
    return tokens.join(' - ');
  },

  actions: {
//    error(error, transition) {
//      return true;
//    },
  },

}, ApplicationRouteMixin);
