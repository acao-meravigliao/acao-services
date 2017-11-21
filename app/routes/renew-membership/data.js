import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  titleToken: 'Dati',

  model() {
    return Ember.RSVP.hash({
      serviceTypes: this.get('store').findAll('ygg--acao--service-type'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    let parentModel = this.modelFor('renew-membership');

    controller.set('context', parentModel.context);
    controller.set('state', parentModel.state);
    controller.setProperties(parentModel.state);
  },
}, AuthenticatedRouteMixin);
