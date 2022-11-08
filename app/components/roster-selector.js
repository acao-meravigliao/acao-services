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

  get valid() {
    return (this.selection_count >= this.args.needed_total) &&
           (this.selection_high_season_count >= this.args.needed_high_season);
  }

  @action selection_changed() {
    if (this.args.selection_changed)
      this.args.selection_changed(this.selection);

    if (this.args.selection_validity_changed)
      this.args.selection_validity_changed(this.valid);
  }

  get filtered_roster_days() {
    return this.args.days.filter((x) => (
      this.flt_available_slots ? x.roster_entries.length < x.needed_people : true) &&
      ((this.flt_high_season && x.high_season) || (this.flt_low_season && !x.high_season))
    );
  }

  get sorted_filtered_roster_days() {
    return this.filtered_roster_days.sortBy('roster_days_sort_order');
  }

  is_selected(day) {
    return this.selection.includes(day);
  }

  get sorted_filtered_roster_days_with_selected() {
    return this.sorted_filtered_roster_days.map((x) => ({ day: x, selected: this.is_selected(x) })) ;
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


//  @tracked monthSelect = 'all';
//  @tracked seasonSelect = 'all';
//  @tracked includeBusy = false;
//
//  get canBeChief() { return this.args.person.acao_roster_chief; }
//
//  get saveDisabled() {
//    return this.saving || !this.isDirty;
//  }
//
//  get myRosterEntries() {
//    return this.args.roster_entries.filter((item) =>
//      (item.belongsTo('person').id() === this.args.person.id &&
//       item.roster_day.get('date').getFullYear() === this.year
//      )
//    );
//  }
//
//  get isDirty() {
//    return this.myRosterEntries.any((record) => (record.get('hasDirtyAttributes') || record.get('isDeleted')));
//  }
//
//  get peakRosterEntries() {
//    return this.myRosterEntries.filter((item) =>
//      (item.belongsTo('roster_day').value().get('high_season'))
//    );
//  }
//
//  get allRosterDays() {
//    return this.args.roster_days.filter((x) => (x.date.getFullYear() === this.year));
//  }
//
//  get rosterDaysSorted() { return this.allRosterDays.sortBy('date'); }
//
//  get filteredRosterDays() {
//    return this.rosterDaysSorted.filter((item) =>
//      (
//       (this.seasonSelect === 'all' ||
//       (this.seasonSelect === 'high' && item.get('high_season')) ||
//       (this.seasonSelect === 'low' && !item.get('high_season'))) &&
//       (this.includeBusy ? true : (item.roster_entries.length < item.needed_people)) &&
//       (this.monthSelect === 'all' || Number(this.monthSelect) === item.get('date').getMonth())
//      )
//    );
//  }
//
//  get tooManyEntries() {
//    return this.myRosterEntries.length > this.args.needed_total
//  }
//
//  get requisiteEntriesMissing() {
//    return this.myRosterEntries.length < this.args.needed_total ||
//           this.peakRosterEntries.length < this.args.needed_high_season;
//  }
//
//  get requisiteEntriesOk() {
//    return !this.requisiteEntriesMissing && !this.isDirty;
//  }
//
//  cancelSelections() {
//    this.args.store.peekAll('ygg--acao--roster-entry').forEach((record) => { record.rollbackAttributes(); });
//  }
//
//  saveSelections() {
//    let me = this;
//    let promises = [];
//
//    this.set('saving', true);
//    this.set('saveError', null);
//
//    this.myRosterEntries.filter((x) => (x.get('hasDirtyAttributes') || x.get('isDeleted'))).forEach((record) => {
//      promises.push(record.save());
//    });
//
//    all(promises).then(function() {
//      me.set('saving', false);
//      me.set('saveSuccess', true);
//    }).catch((error) => {
//      me.set('saving', false);
//      me.set('saveError', error.exception ? error.exception.title : 'Unspecified error');
//    });
//  }
//
//
//  @action addDay(dayEntry) {
//    this.args.store.createRecord('ygg--acao--roster-entry', {
//      person: this.person,
//      roster_day: dayEntry,
//    });
//  }
//
//  @action delEntry(entry) {
//    entry.deleteRecord();
//  }
//
//  @action save() {
//    if (this.requisiteEntriesMissing) {
//      if (confirm('Non tutti i turni necessari sono stati selezionati, continuare comunque?'))
//        this.saveSelections();
//    } else
//      this.saveSelections();
//  }
//
//  @action cancel() {
//    this.cancelSelections();
//  }
}
