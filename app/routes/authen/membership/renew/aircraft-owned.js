import WizardPageRoute from './wizard-page-route';
import { service } from '@ember/service';

export default class AuthenRenewMembershipRenewAircraftOwnedRoute extends WizardPageRoute {
  @service store;
  @service session;
  @service router;

  queryParams = {
    aco: {
      refreshModel: true,
      replace: true,
    }
  };

  model(params) {
    const esel = this.wizard.context_sel.snapshot();

    return {
      aircraft_owner: esel.get(params.aco),
      esel: esel,
    };
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    controller.reset();
  }

}
