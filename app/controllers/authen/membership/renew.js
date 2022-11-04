import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenMembershipRenewController extends Controller {
  @service session;
  @service clock;
  @service ms;

  get wizard() { return this.model; }

  get renew_is_open() {
    return this.wizard &&
           this.wizard.opening_time &&
           this.clock.date > new Date(this.wizard.opening_time);
  }

  get renew_is_open_and_needed() {
    return this.renew_is_open &&
           !this.wizard.memberships.some((item) => (item.reference_year_id == this.wizard.year_id));
  }

  get renew_is_going_to_open() {
    return this.wizard &&
           this.wizard.announce_time &&
           this.wizard.opening_time &&
           this.clock.date > new Date(this.wizard.announce_time) &&
           this.clock.date < new Date(this.wizard.opening_time);
  }
}
