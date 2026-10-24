import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenRenewMembershipRenewBioEditRoute extends Route {
  setupController(controller, model) {
    super.setupController(...arguments);

    const wizard = this.modelFor('authen.membership.renew');

    controller.sel = wizard.person_sel;
    controller.esel = wizard.context_sel.snapshot();
  }
}
