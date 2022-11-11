import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MembershipStatusService extends Service {
  @service clock;
  @service session;

  @tracked store_membership;
  @tracked years;

  update(data) {
    this.store_membership = data.store_membership;
    this.years = data.years;
  }

  get my_memberships() {
    return this.store_membership.filter((x) => (x.person_id === this.session.person_id));
  }

  get current_year() {
    return this.years.findBy('year', this.clock.date.getFullYear());
  }

  get current_renew_is_open() {
    return this.current_year &&
           this.current_year.renew_opening_time &&
           this.clock.date > new Date(this.current_year.renew_opening_time);
  }

  get current_renew_is_needed() {
    return !this.my_memberships.some((item) => (item.reference_year_id === this.current_year.id));
  }

  get current_renew_is_open_and_needed() {
    return this.current_renew_is_open &&
           this.current_renew_is_needed;
  }

  get next_year() {
    return this.years.findBy('year', this.clock.date.getFullYear() + 1);
  }

  get next_renew_is_open() {
    return this.next_year &&
           this.next_year.renew_opening_time &&
           this.clock.date > new Date(this.next_year.renew_opening_time);
  }

  get next_renew_is_needed() {
    return !this.my_memberships.some((item) => (item.reference_year_id === this.next_year.id));
  }

  get next_renew_is_open_and_needed() {
    return this.next_renew_is_open &&
           this.next_renew_is_needed;
  }

  get next_renew_is_going_to_open() {
    return this.next_year &&
           this.next_year.renew_announce_time &&
           this.next_year.renew_opening_time &&
           this.clock.time > new Date(this.next_year.renew_announce_time) &&
           this.clock.time < new Date(this.next_year.renew_opening_time);
  }

  get next_renew_is_going_to_open_and_needed() {
    return this.next_renew_is_going_to_open &&
           this.next_renew_is_needed;
  }
}
