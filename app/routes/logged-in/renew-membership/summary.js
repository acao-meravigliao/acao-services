import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return hash({
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties(this.modelFor('renew-membership').state);
  },
});
