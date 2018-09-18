import $ from 'jquery';
import { hash } from 'rsvp';
import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend({

  titleToken: 'Rinnovo iscrizione',

  state: EmberObject.create({
    currentStep: 'index',
    enableCav: true,
    enableEmail: true,
    acceptRules: false,
  }),

  model() {
    return hash({
      context: $.getJSON('/ygg/acao/memberships/renew'),
      state: this.state,
    });
  },

  afterModel(model, transition) {
    if (model.state.get('currentStep') != transition.targetName.split('.').pop()) {
      this.transitionTo(this.routeName + '.' + model.state.get('currentStep'));
    }
  },

}, AuthenticatedRouteMixin);
