import WizardPageRoute from './wizard-page-route';
import { service } from '@ember/service';

export default class AuthenRenewMembershipRenewAircraftNewRoute extends WizardPageRoute {
  @service store;
  @service session;
  @service router;

  model(params) {
    return {};
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    controller.reset();
  }
}
