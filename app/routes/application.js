import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
//  ws: Ember.inject.service('web-socket'),

//  model() {
//console.log("APPLICATION ROTUE", this.get('session').get('data'));
//
//    return Ember.RSVP.hash({
//      person: this.store.findRecord('person', this.get('session.data.authenticated.auth_person.id')),
////      memberships: this.store.query('membership', { filter: { person_id: 2 } }),
//    });
//  },


  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setLocale('it');
  },

//  init() {
//    this._super(...arguments);
//
//    this.get('ws').connect();
//  },
}, ApplicationRouteMixin);
