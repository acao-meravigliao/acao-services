import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class AuthenRenewMembershipController extends Controller {
  @service session;
  @service('my-clock') clock;

  get context() { return this.model.context; }
  get person() { return this.session.person; }
  get serviceTypes() { return this.model.serviceTypes; }
  get state() { return this.model.state; }

  get renewIsOpen() {
    return this.context &&
           this.get('context.opening_time') &&
           this.get('clock.date') > new Date(this.get('context.opening_time'));
  }

  get renewIsOpenAndNeeded() {
    return this.renewIsOpen &&
           !this.get('model.memberships').any((item) => (item.get('reference_year_id') == this.get('context.year_id')));
  }

  get renewIsGoingToOpen() {
    return this.get('model.context.next.announce_time') &&
           this.get('model.context.next.opening_time') &&
           this.get('clock.date') > new Date(this.get('model.context.next.announce_time')) &&
           this.get('clock.date') < new Date(this.get('model.context.next.opening_time'));
  }
}
