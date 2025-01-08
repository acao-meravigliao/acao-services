import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class RosterDaysController extends Controller {
  @service router;
  @tracked roster_days_sort_order = [ 'date' ];
  @tracked current_year;

  @tracked flt_high_season = true;
  @tracked flt_low_season = true;
  @tracked show_slots = false;

  get filtered_roster_days() {
    return this.model.filter((x) => (
      ((this.flt_high_season && x.high_season) || (this.flt_low_season && !x.high_season))
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
    this.router.transitionTo({ queryParams: { year: this.prev_year }});
  }

  @action go_next() {
    this.router.transitionTo({ queryParams: { year: this.next_year }});
  }

  @action toggle_high_season() {
    this.flt_high_season = !this.flt_high_season;
    if (!this.flt_high_season && !this.flt_low_season)
        this.flt_low_season = true;
  }

  @action toggle_low_season() {
    this.flt_low_season = !this.flt_low_season;
    if (!this.flt_high_season && !this.flt_low_season)
      this.flt_high_season = true;
  }

  @action toggle_show_slots() {
    this.show_slots = !this.show_slots;
  }


}
