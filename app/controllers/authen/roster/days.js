import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class RosterDaysController extends Controller {
  @tracked filterComplete = false
  @tracked showSlots = false
  @tracked rosterDaysSortOrder = [ 'date' ];

  get filteredRosterDays() {
    return this.model.filter((x) => (this.filterComplete ? x.get('roster_entries.length') < x.get('needed_people') : true));
  }

  get sortedFilteredRosterDays() { return this.filteredRosterDays.sortBy('rosterDaysSortOrder'); }

  get prevYear() { return this.currentYear - 1; }
  get nextYear() { return this.currentYear + 1; }
}
