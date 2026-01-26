import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class RosterSelectorComponent extends Component {
  @tracked roster_days_sort_order = [ 'date' ];
  @tracked selection = A();

  constructor() {
    super(...arguments);

    this.selection = A(this.args.initial_selection);

    this.flt_incoming_enabled = (this.args.flt_incoming_enabled !== undefined) ? this.args.flt_incoming_enabled : true;
    this.flt_incoming = (this.args.flt_incoming !== undefined) ? this.args.flt_incoming : true;

    this.flt_low_season = (this.args.flt_low_season !== undefined) ? this.args.flt_low_season : true;
    this.flt_high_season = (this.args.flt_high_season !== undefined) ? this.args.flt_high_season : true;

    this.flt_available_slots_enabled = (this.args.flt_available_slots_enabled !== undefined) ? this.args.flt_available_slots_enabled : true;
    this.flt_available_slots = (this.args.flt_available_slots !== undefined) ? this.args.flt_available_slots : true;
  }

  get filtered_roster_days() {
    let start_of_day = new Date();
    start_of_day.setUTCHours(0, 0, 0, 0);
    start_of_day.setDate(start_of_day.getDate() + 1);

    return this.args.days.filter((x) => (
      (!this.flt_incoming || x.date >= start_of_day) &&
      ((this.flt_high_season && x.high_season) || (this.flt_low_season && !x.high_season)) &&
      (!this.flt_available_slots || (x.entries.length < x.needed_people)))
    );
  }

  get sorted_filtered_roster_days() {
    return this.filtered_roster_days.sort((a,b) => (a[this.roster_days_sort_order] - b[this.roster_days_sort_order]));
  }

  is_selected = (day) => (this.selection.map((x)=>(x.id)).includes(day.id));

  @action on_add(day) {
    this.selection.pushObject(day);
    this.selection_changed();
  }

  // For some reason day and ourday are not the same object when jumping steps, indagate further
  @action on_del(day) {
    const ourday = this.selection.find((x) => (x.id === day.id));

    this.selection.removeObject(ourday);
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

  @tracked flt_incoming = false;
  @action flt_incoming_changed(ev) {
    this.flt_incoming = ev.target.checked;
  }

  @tracked flt_high_season = true;
  @action flt_high_season_changed(ev) {
    this.flt_high_season = ev.target.checked;
    if (!this.flt_high_season && !this.flt_low_season)
        this.flt_low_season = true;
  }

  @tracked flt_low_season = true;
  @action flt_low_season_changed(ev) {
    this.flt_low_season = ev.target.checked;
    if (!this.flt_high_season && !this.flt_low_season)
      this.flt_high_season = true;
  }

  @tracked flt_available_slots = false;
  @action flt_available_slots_changed(ev) {
    this.flt_available_slots = ev.target.checked;
  }

  @action toggle_filters() {
    this.flt_show = !this.flt_show;
  }

  @action flt_hide() {
    this.flt_show = false;
  }
}
