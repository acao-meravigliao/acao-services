import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  mainTitle: 'Rinnovo iscrizione',

  state: Ember.Object.create({
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

//  afterModel(model) {
//    if (!model.context.membership) {
//      this.transitionTo('renew-membership');
//    } else if (model.context.membership.status == 'WAITING_PAYMENT') {
//      this.transitionTo('renew-membership.payment-' + model.context.membership.payment_method);
//    }
//  },

}, AuthenticatedRouteMixin);
