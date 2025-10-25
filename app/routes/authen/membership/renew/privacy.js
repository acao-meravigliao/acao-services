import Route from '@ember/routing/route';
import { service } from '@ember/service';
import SelectedService from 'acao-services/utils/selected-service';

export default class AuthenRenewMembershipPrivacyRoute extends Route {
  model() {
    return { };
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    const wizard = this.modelFor('authen.membership.renew');
    controller.consent_association = wizard.consent_association;
    controller.consent_surveillance = wizard.consent_surveillance;
    controller.consent_accessory = wizard.consent_accessory;
    controller.consent_profiling = wizard.consent_profiling;
    controller.consent_magazine = wizard.consent_magazine;
    controller.consent_fai = wizard.consent_fai;
    controller.consent_marketing = wizard.consent_marketing;
  }
}
