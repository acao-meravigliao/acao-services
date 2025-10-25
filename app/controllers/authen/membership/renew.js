import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenMembershipRenewController extends Controller {
  @service session;
  @service clock;
  @service ms;

  get wizard() { return this.model; }

  get renew_is_open() {
    return this.ms.renew_open_for_year(this.wizard.year_model);
  }

  get renew_is_open_and_available() {
    return this.ms.renew_open_and_available_for_year(this.wizard.year_model);
  }
}
