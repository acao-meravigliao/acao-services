import BaseRoute from '../../../base-route';
import { service } from '@ember/service';

export default class AuthenRenewMembershipRenewAircraftNewRoute extends BaseRoute {
  @service store;
  @service session;
  @service router;

  model(params) {
    return {};
  }
}
