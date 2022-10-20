import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RosterDaysController extends Controller {
  @service router;

  @tracked filterComplete = false;
  @tracked showSlots = false;
  @tracked rosterDaysSortOrder = [ 'date' ];

  get filteredRosterDays() {
    return this.model.filter((x) => (this.filterComplete ? x.get('roster_entries.length') < x.get('needed_people') : true));
  }

  get sortedFilteredRosterDays() { return this.filteredRosterDays.sortBy('rosterDaysSortOrder'); }

  get prev_year() { return this.current_year - 1; }
  get next_year() { return this.current_year + 1; }

  @action go_prev() {
    this.router.transitionTo({ queryParams: { year: this.prev_year }});
  }

  @action go_next() {
    this.router.transitionTo({ queryParams: { year: this.next_year }});
  }
}
