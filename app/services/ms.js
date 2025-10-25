import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class MembershipStatusService extends Service {
  @service clock;
  @service session;

  @tracked memberships;
  @tracked years;

  update(data) {
    this.memberships = data.memberships;
    this.years = data.years;
  }

  get relevant_memberships() {
    return this.memberships.filter((x) => (x.year === this.current_year || x.year === this.next_year));
  }

  get current_year() {
    return this.years.find((x) => (x.year === this.clock.date.getFullYear()));
  }

  get current_renew_is_open() {
    return this.current_year &&
           this.current_year.renew_opening_time &&
           this.clock.date > new Date(this.current_year.renew_opening_time);
  }

  get current_renew_is_needed() {
    return !this.memberships.some((item) => (item.reference_year_id === this.current_year.id));
  }

  get current_renew_is_open_and_needed() {
    return this.current_renew_is_open &&
           this.current_renew_is_needed;
  }

  get next_year() {
    return this.years.find((x) => (x.year === this.clock.date.getFullYear() + 1));
  }

  get next_renew_is_open() {
    return this.next_year &&
           this.next_year.renew_opening_time &&
           this.clock.date > new Date(this.next_year.renew_opening_time);
  }

  get next_renew_is_needed() {
    return !this.memberships.some((item) => (item.reference_year_id === this.next_year.id));
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

  get next_will_open_in() {
    this.clock.date;

    return moment(this.next_year.renew_opening_time).fromNow();
  }
}
