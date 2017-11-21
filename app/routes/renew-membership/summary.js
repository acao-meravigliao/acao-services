import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  titleToken: 'Riassunto',

  model() {
    return Ember.RSVP.hash({
      serviceTypes: this.get('store').findAll('ygg--acao--service-type'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    let parentModel = this.modelFor('renew-membership');

console.log("STATE3", JSON.stringify(parentModel.state));

    controller.set('context', parentModel.context);
    controller.set('state', parentModel.state);
    controller.setProperties(parentModel.state);
  },

}, AuthenticatedRouteMixin);
