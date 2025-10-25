import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class MembershipStatusService extends Service {
  @service clock;
  @service session;

  @tracked passepartout = false;
  @tracked memberships;
  @tracked years;

  update(data) {
    this.passepartout = data.passepartout;
    this.memberships = data.memberships;
    this.years = data.years;
  }

  get relevant_memberships() {
    return this.memberships.filter((x) => (x.year === this.current_year || x.year === this.next_year));
  }

  get current_year() {
    return this.years.find((x) => (x.year === this.clock.date.getFullYear()));
  }

  year_model(year) {
    return this.years.find((x) => (x.year === year));
  }

  renew_open_for_year(year_model) {
    return this.passepartout ||
           this.year_model &&
           this.year_model.renew_opening_time &&
           this.clock.date > new Date(this.year_model.renew_opening_time);
  }

  renew_available_for_year(year_model) {
    return this.passepartout ||
           !this.memberships.some((item) => (item.reference_year_id === this.year_model.id));
  }

  renew_open_and_available_for_year(year_model) {
    return this.renew_open_for_year(year_model) &&
           this.renew_available_for_year(year_model);
  }

  renew_going_to_open_for_year(year_model) {
    return this.year_model &&
           this.year_model.renew_announce_time &&
           this.year_model.renew_opening_time &&
           this.clock.time > new Date(this.year_model.renew_announce_time) &&
           this.clock.time < new Date(this.year_model.renew_opening_time);
  }

  get current_renew_is_open() {
    return this.renew_open_for_year(this.current_year);
  }

  get current_renew_is_available() {
    return this.renew_available_for_year(this.current_year);
  }

  get current_renew_is_open_and_available() {
    return this.current_renew_is_open &&
           this.current_renew_is_available;
  }

  get next_year() {
    return this.years.find((x) => (x.year === this.clock.date.getFullYear() + 1));
  }

  get next_renew_is_open() {
    return this.renew_open_for_year(this.next_year);
  }

  get next_renew_is_available() {
    return this.renew_available_for_year(this.next_year);
  }

  get next_renew_is_open_and_available() {
    return this.next_renew_is_open &&
           this.next_renew_is_available;
  }

  get next_renew_is_going_to_open() {
    return this.renew_going_to_open_for_year(this.next_year);
  }

  get next_renew_is_going_to_open_and_available() {
    return this.next_renew_is_going_to_open &&
           this.next_renew_is_available;
  }

  get next_will_open_in() {
    this.clock.date;

    return moment(this.next_year.renew_opening_time).fromNow();
  }
}
