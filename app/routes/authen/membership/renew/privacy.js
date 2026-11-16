import WizardPageRoute from './wizard-page-route';
import { service } from '@ember/service';
import SelectedService from 'acao-services/utils/selected-service';

export default class AuthenRenewMembershipPrivacyRoute extends WizardPageRoute {
  model() {
    return { };
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    controller.consent_association = this.wizard.state.consent_association;
    controller.consent_surveillance = this.wizard.state.consent_surveillance;
    controller.consent_accessory = this.wizard.state.consent_accessory;
    controller.consent_profiling = this.wizard.state.consent_profiling;
    controller.consent_magazine = this.wizard.state.consent_magazine;
    controller.consent_fai = this.wizard.state.consent_fai;
    controller.consent_marketing = this.wizard.state.consent_marketing;
  }
}
