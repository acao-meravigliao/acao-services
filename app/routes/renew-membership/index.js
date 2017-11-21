import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  titleToken: 'Inizio',

  session: Ember.inject.service('session'),

  model() {
    return Ember.RSVP.hash({
      person: this.store.findRecord('ygg--core--person', this.get('session.personId')),
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('context', this.modelFor('renew-membership').context);
    controller.set('state', this.modelFor('renew-membership').state);
    controller.setProperties(this.modelFor('renew-membership').state);
  },
}, AuthenticatedRouteMixin);
