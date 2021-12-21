import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class AuthenRenewMembershipDataRoute extends Route {
  model() {
    return hash({
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);

console.log("EEDDDDDDDDDDDEEEEEEEEEE", this.modelFor('authen.renew-membership'));

    controller.services = this.modelFor('authen.renew-membership').state.services;
  }
}
