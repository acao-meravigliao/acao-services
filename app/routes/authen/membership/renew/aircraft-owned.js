import BaseRoute from '../../../base-route';
import { service } from '@ember/service';

export default class AuthenRenewMembershipRenewAircraftOwnedRoute extends BaseRoute {
  @service store;
  @service session;
  @service router;

  queryParams = {
    ac: {
      refreshModel: true,
      replace: true,
    }
  };

  model(params) {
    const wizard = this.modelFor('authen.membership.renew');
    const ac = wizard.aircraft_ownerships.find((x) => (x.aircraft.id === params.ac));

    return ac;
  }
}
