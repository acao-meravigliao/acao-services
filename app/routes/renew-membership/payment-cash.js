import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend({
  titleToken: 'Pagamento in Contanti',

  setupController(controller, model) {
    controller.set('context', model.context);
    controller.set('state', model.state);
    controller.setProperties(model.state);
  },
}, AuthenticatedRouteMixin);
