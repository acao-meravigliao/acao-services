import Route from '@ember/routing/route';
import { service } from '@ember/service';
import SelectedService from 'acao-services/utils/selected-service';

export default class AuthenRenewMembershipDataRoute extends Route {
  model() {
    return {
      services: this.modelFor('authen.membership.renew').services.map((x) => (
        // Implement proper object clone

        Object.assign(Object.create(Object.getPrototypeOf(x)), {
          type: x.type,
          type_changeable: x.type_changeable,
          enabled: x.enabled,
          removable: x.removable,
          toggable: x.toggable,
          extra_info: x.extra_info,
        })
      )),
    }
  }
}
