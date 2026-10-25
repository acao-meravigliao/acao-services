import Route from '@ember/routing/route';
import { service } from '@ember/service';
import SelectedService from 'acao-services/utils/selected-service';
import { TrackedArray } from 'tracked-built-ins';

export default class AuthenRenewMembershipBillRoute extends Route {
  @service vos;

  async model() {
    const wizard = this.modelFor('authen.membership.renew');

    const res = await this.vos.class_call('ygg--acao--membership', 'update_aircrafts', { updates: wizard.aircraft_changes });

    wizard.update({
      extra_services: (await this.vos.class_call('ygg--acao--membership', 'extra_services', { year: wizard.year })).body,
    });

    return {
      services: new TrackedArray((wizard.base_services.concat(wizard.extra_services)).map((x) => new SelectedService({
        type: wizard.context_sel.get(x.service_type_id),
        type_changeable: false,
        removable: x.removable,
        toggable: x.toggable,
        enabled: x.enabled,
        extra_info: x.extra_info,
      })))
    };
  }
}
