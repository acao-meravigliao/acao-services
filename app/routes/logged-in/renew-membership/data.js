import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      serviceTypes: this.store.findAll('ygg--acao--service-type'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties(this.modelFor('logged-in.renew-membership').state);
  },
});
