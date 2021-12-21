import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class AuthenRenewMembershipSummaryRoute extends Route {
  model() {
    return hash({
    });
  }

//  setupController(controller, model) {
//    super.setupController(...arguments);
//    controller.setProperties(this.modelFor('authen.renew-membership').state);
//  }
}
