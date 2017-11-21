import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  titleToken: 'Pagamento in Contanti',

  setupController(controller, model) {
    controller.set('context', model.context);
    controller.set('state', model.state);
    controller.setProperties(model.state);
  },
}, AuthenticatedRouteMixin);
