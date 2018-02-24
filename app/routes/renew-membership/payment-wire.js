import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend({
  titleToken: 'Pagamento con Bonifico',

  setupController(controller, model) {
    controller.set('context', model.context);
    controller.set('state', model.state);
    controller.setProperties(model.state);
  },
}, AuthenticatedRouteMixin);
