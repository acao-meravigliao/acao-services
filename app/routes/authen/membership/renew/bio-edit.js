import WizardPageRoute from './wizard-page-route';
import { service } from '@ember/service';

export default class AuthenRenewMembershipRenewBioEditRoute extends WizardPageRoute {
  setupController(controller, model) {
    super.setupController(...arguments);

    controller.sel = this.wizard.person_sel;
    controller.esel = this.wizard.context_sel.snapshot();
  }
}
