import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  titleToken: 'Rinnovo iscrizione',

  state: Ember.Object.create({
    currentStep: 'index',
    enableCav: true,
    enableEmail: true,
    acceptRules: false,
  }),

  model() {
    return Ember.RSVP.hash({
      context: Ember.$.getJSON('/ygg/acao/memberships/renew'),
      state: this.get('state'),
    });
  },

  afterModel(model, transition) {
    if (model.state.get('currentStep') != transition.targetName.split('.').pop()) {
      this.transitionTo(this.get('routeName') + '.' + model.state.get('currentStep'));
    }
  },

}, AuthenticatedRouteMixin);
