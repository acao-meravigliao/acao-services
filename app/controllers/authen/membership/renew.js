import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenMembershipRenewController extends Controller {
  @service session;
  @service clock;
  @service ms;

  get context() { return this.model.context; }
  get state() { return this.model.state; }

  get renew_is_open_and_needed() {
    return this.renew_is_open &&
           !this.context.memberships.some((item) => (item.reference_year_id == this.context.year_id));

  }

  get renew_is_going_to_open() {
    return this.context &&
           this.context.announce_time &&
           this.context.opening_time &&
           this.clock.date > new Date(this.context.announce_time) &&
           this.clock.date < new Date(this.context.opening_time);
  }

  get renew_is_open() {
    return this.context &&
           this.context.opening_time &&
           this.clock.date > new Date(this.context.opening_time);
  }
}
