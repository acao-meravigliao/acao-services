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

  icon_for = (role) => (this.authen_controller.available_roles.find((x) => (x.symbol === role)).icon);

  //------------------- Renewal -------------------
  @action start_current_membership_renewal() {
    this.router.transitionTo('authen.membership.renew', this.ms.current_year.year);
  }

  @action start_next_membership_renewal() {
    this.router.transitionTo('authen.membership.renew', this.ms.next_year.year);
  }


  //------------------- Roster -------------------
  get my_next_roster_entries() {
    return this.model.get_all('ygg--acao--roster-entry');
  }

  get my_next_roster_entries_unsorted() {
    return this.my_next_roster_entries.sort((a,b) => (a.date - b.date));
  }
}
