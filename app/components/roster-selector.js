import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class RosterSelectorComponent extends Component {
  @tracked flt_high_season = true;
  @tracked flt_low_season = true;
  @tracked flt_available_slots = false;
  @tracked flt_show = false;
  @tracked roster_days_sort_order = [ 'date' ];
  @tracked selection = A();

  constructor() {
    super(...arguments);

    this.selection = A(this.args.initial_selection);
  }

  get filtered_roster_days() {
    return this.args.days.filter((x) => (
      this.flt_available_slots ? x.entries.length < x.needed_people : true) &&
      ((this.flt_high_season && x.high_season) || (this.flt_low_season && !x.high_season))
    );
  }

  get sorted_filtered_roster_days() {
    return this.filtered_roster_days.sort((a,b) => (a[this.roster_days_sort_order] - b[this.roster_days_sort_order]));
  }

  is_selected(day) {
    return this.selection.includes(day);
  }

  get sorted_filtered_roster_days_with_selected() {
    return this.sorted_filtered_roster_days.map((x) => ({ day: x, selected: this.is_selected(x) })) ;
  }

  @action on_add(day) {
    this.selection.pushObject(day);
    this.selection_changed();
  }

  @action on_del(day) {
    this.selection.removeObject(day);
    this.selection_changed();
  }

  get selection_count() {
    return this.selection.length;
  }

  get selection_high_season() {
    return this.selection.filter((x) => (x.high_season));
  }

  get selection_high_season_count() {
    return this.selection_high_season.length;
  }

  get enough_total() {
    return this.selection_count >= this.args.needed_total;
  }

  get enough_high_season() {
    return this.selection_high_season_count >= this.args.needed_high_season;
  }

  get valid() {
    return this.enough_total && this.enough_high_season;
  }

  @action selection_changed() {
    if (this.args.selection_changed)
      this.args.selection_changed(this.selection);

    if (this.args.selection_validity_changed)
      this.args.selection_validity_changed(this.valid);
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

  @action toggle_available_slots() {
    this.flt_available_slots = !this.flt_available_slots;
  }

  @action toggle_filters() {
    this.flt_show = !this.flt_show;
  }

  @action flt_hide() {
    this.flt_show = false;
  }
}
