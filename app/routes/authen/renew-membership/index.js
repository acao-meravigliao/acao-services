import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties(this.modelFor('authen.renew-membership').state);
  },
});
