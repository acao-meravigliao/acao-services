import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class AuthenRenewMembershipController extends Controller {
  @service session;
  @service('my-clock') clock;

  get context() { return this.model.context; }
  get state() { return this.model.state; }

  get renew_is_open() {
    return this.context &&
           this.context.opening_time &&
           this.clock.date > new Date(this.context.opening_time);
  }

  get renew_is_open_and_needed() {
    return this.renew_is_open &&
           !this.context.memberships.any((item) => (item.reference_year_id == this.context.year_id));
  }

  get renewIsGoingToOpen() {
    return this.context &&
           this.context.announce_time &&
           this.context.opening_time &&
           this.clock.date > new Date(this.context.announce_time) &&
           this.clock.date < new Date(this.context.opening_time);
  }
}
