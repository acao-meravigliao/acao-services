import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class DaysController extends Controller {
  @service session;

  @tracked rosterDaysSortOrder = [ 'date' ];

  get sortedRosterDays() { return this.model.sortBy('rosterDaysSortOrder'); }

  get prevYear() { return this.currentYear - 1; }
  get nextYear() { return this.currentYear + 1; }
}
