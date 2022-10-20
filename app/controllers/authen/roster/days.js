import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class RosterDaysController extends Controller {
  @service router;
  @tracked filter_complete = false;
  @tracked show_slots = true;
  @tracked roster_days_sort_order = [ 'date' ];
  @tracked current_year;

  get filtered_roster_days() {
    return this.model.filter((x) => (this.filter_complete ? x.roster_entries.length < x.needed_people : true));
  }

  get sorted_filtered_roster_days() {
    return this.filtered_roster_days.sortBy('roster_days_sort_order');
  }

  get prev_year() { return this.current_year - 1; }
  get next_year() { return this.current_year + 1; }

  @action go_prev() {
    this.router.transitionTo({ queryParams: { year: this.prev_year }});
  }

  @action go_next() {
    this.router.transitionTo({ queryParams: { year: this.next_year }});
  }
}
