import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class RosterDaysController extends Controller {
  @service router;
  @tracked roster_days_sort_order = [ 'date' ];
  @tracked current_year;

  @tracked flt_incoming = true;
  @tracked flt_high_season = true;
  @tracked flt_low_season = true;
  @tracked show_slots = false;

  constructor() {
    super(...arguments);

    if (this.prev_year < new Date().getFullYear())
      this.flt_incoming = false;
  }

  get days() {
    return this.model.get_cls('ygg--acao--roster-day');
  }

  get filtered_roster_days() {
    let start_of_day = new Date();
    start_of_day.setUTCHours(0, 0, 0, 0);

    return this.days.filter((x) => (
      (!this.flt_incoming || x.date >= start_of_day) &&
        ((this.flt_high_season && x.high_season) ||
         (this.flt_low_season && !x.high_season))
    ));
  }

  get sorted_filtered_roster_days() {
    return this.filtered_roster_days.sort((a,b) => {
      return a[this.roster_days_sort_order] - b[this.roster_days_sort_order];
    });
  }

  get prev_year() { return this.current_year - 1; }
  get next_year() { return this.current_year + 1; }

  @action go_prev() {
    this.flt_incoming = false;
    this.router.transitionTo({ queryParams: { year: this.prev_year }});
  }

  @action go_next() {
    this.router.transitionTo({ queryParams: { year: this.next_year }});
  }

  @action flt_incoming_on_change(ev) {
    this.flt_incoming = ev.target.checked;
  }

  @action flt_high_season_on_change(ev) {
    this.flt_high_season = ev.target.checked;

    if (!this.flt_high_season && !this.flt_low_season)
        this.flt_low_season = true;
  }

  @action flt_low_season_on_change(ev) {
    this.flt_low_season = ev.target.checked;

    if (!this.flt_high_season && !this.flt_low_season)
      this.flt_high_season = true;
  }

  @action show_slots_on_change(ev) {
    this.show_slots = ev.target.checked;
  }


}
