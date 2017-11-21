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

//  afterModel(model) {
//    if (!model.context.membership) {
//      this.transitionTo('renew-membership');
//    } else if (model.context.membership.status == 'WAITING_PAYMENT') {
//      this.transitionTo('renew-membership.payment-' + model.context.membership.payment_method);
//    }
//  },

}, AuthenticatedRouteMixin);
