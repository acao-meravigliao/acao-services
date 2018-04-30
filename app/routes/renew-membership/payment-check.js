import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend({
  titleToken: 'Pagamento con Assegno',

  setupController(controller, model) {
    controller.set('context', model.context);
    controller.set('state', model.state);
    controller.setProperties(model.state);
  },
}, AuthenticatedRouteMixin);
