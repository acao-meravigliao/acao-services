import Route from '@ember/routing/route';

export default class AuthenRenewMembershipIndexRoute extends Route {
  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties(this.modelFor('authen.renew-membership').state);
  }
}
