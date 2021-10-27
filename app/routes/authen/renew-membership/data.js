import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class AuthenRenewMembershipDataRoute extends Route {
  model() {
    return hash({
      serviceTypes: this.store.findAll('ygg--acao--service-type'),
    });
  }

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties(this.modelFor('authen.renew-membership').state);
  }
}
