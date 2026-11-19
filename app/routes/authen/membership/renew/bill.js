import WizardPageRoute from './wizard-page-route';
import { service } from '@ember/service';
import SelectedService from 'acao-services/utils/selected-service';
import { TrackedArray } from 'tracked-built-ins';

export default class AuthenRenewMembershipBillRoute extends WizardPageRoute {
  @service vos;

  async model() {
    this.wizard.extra_services = (await this.vos.class_call('ygg--acao--membership', 'extra_services', { year: this.wizard.year })).body;

    return {
      services: new TrackedArray((this.wizard.base_services.concat(this.wizard.extra_services)).map((x) => new SelectedService({
        type: this.wizard.context_sel.get(x.service_type_id),
        type_changeable: false,
        removable: x.removable,
        toggable: x.toggable,
        enabled: x.enabled,
        extra_info: x.extra_info,
      })))
    };
  }
}
