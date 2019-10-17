import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties(this.modelFor('authen.renew-membership').state);
  },
});
