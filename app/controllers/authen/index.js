import Controller, { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenIndexController extends Controller {
  @service session;
  @service store;
  @service clock;
  @service router;
  @service ms;
  @controller('authen') authen_controller;

  roster_entries_sort_order = ['roster_day.date'];

  get person() {
    return this.model.get_first('ygg--core--person');
  }

  get memberships() {
    return this.model.get_all('ygg--acao--membership');
  }

  get roles() {
    return this.authen_controller.roles;
  }

  get relevant_memberships() {
    return this.memberships.filter((x) => (x.year === this.ms.current_year || x.year === this.ms.next_year));
  }

  //------------------- Renewal -------------------
  @action start_current_membership_renewal() {
    this.router.transitionTo('authen.membership.renew', this.ms.current_year.year);
  }

  @action start_next_membership_renewal() {
    this.router.transitionTo('authen.membership.renew', this.ms.next_year.year);
  }

  //------------------- Roster -------------------
  get my_next_roster_entries() {
    return [];//this.my_next_roster_entries_unsorted.sortBy('roster_entries_sort_order');
  }

  get all_roster_entries() {
    return [];//this.store.peekAll('ygg--acao--roster-entry');
  }

  get my_next_roster_entries_unsorted() {
    return this.all_roster_entries.filter((item) => (
       item.belongsTo('person').id() === this.session.person_id &&
       item.belongsTo('roster_day').value().date > new Date()
      )
    );
  }
}
