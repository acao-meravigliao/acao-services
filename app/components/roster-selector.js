import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { all } from 'rsvp';

export default class RosterSelectorComponent extends Component {

  @tracked monthSelect = 'all';
  @tracked seasonSelect = 'all';
  @tracked includeBusy = false;

  get canBeChief() { return this.args.person.acao_roster_chief; }

  get year() { return this.args.year; }

  get saveDisabled() {
    return this.saving || !this.isDirty;
  }

  get myRosterEntries() {
    return this.args.roster_entries.filter((item) =>
      (item.belongsTo('person').id() == this.args.person.id &&
       item.roster_day.get('date').getFullYear() == this.year
      )
    );
  }

  get isDirty() {
    return this.myRosterEntries.any((record) => (record.get('hasDirtyAttributes') || record.get('isDeleted')));
  }

  get peakRosterEntries() {
    return this.myRosterEntries.filter((item) =>
      (item.belongsTo('roster_day').value().get('high_season'))
    );
  }

  get allRosterDays() {
    return this.args.roster_days.filter((x) => (x.date.getFullYear() == this.year));
  }

  get rosterDaysSorted() { return this.allRosterDays.sortBy('date'); }

  get filteredRosterDays() {
    return this.rosterDaysSorted.filter((item) =>
      (
       (this.seasonSelect == 'all' ||
       (this.seasonSelect == 'high' && item.get('high_season')) ||
       (this.seasonSelect == 'low' && !item.get('high_season'))) &&
       (this.includeBusy ? true : (item.roster_entries.length < item.needed_people)) &&
       (this.monthSelect == 'all' || Number(this.monthSelect) == item.get('date').getMonth())
      )
    );
  }

  get tooManyEntries() {
    return this.myRosterEntries.length > this.args.needed_total
  }

  get requisiteEntriesMissing() {
    return this.myRosterEntries.length < this.args.needed_total ||
           this.peakRosterEntries.length < this.args.needed_high_season;
  }

  get requisiteEntriesOk() {
    return !this.requisiteEntriesMissing && !this.isDirty;
  }

  cancelSelections() {
    this.args.store.peekAll('ygg--acao--roster-entry').forEach((record) => { record.rollbackAttributes(); });
  }

  saveSelections() {
    let me = this;
    let promises = [];

    this.set('saving', true);
    this.set('saveError', null);

    this.myRosterEntries.filter((x) => (x.get('hasDirtyAttributes') || x.get('isDeleted'))).forEach((record) => {
      promises.push(record.save());
    });

    all(promises).then(function() {
      me.set('saving', false);
      me.set('saveSuccess', true);
    }).catch((error) => {
      me.set('saving', false);
      me.set('saveError', error.exception ? error.exception.title : 'Unspecified error');
    });
  }


  @action addDay(dayEntry) {
    this.args.store.createRecord('ygg--acao--roster-entry', {
      person: this.person,
      roster_day: dayEntry,
    });
  }

  @action delEntry(entry) {
    entry.deleteRecord();
  }

  @action save() {
    if (this.requisiteEntriesMissing) {
      if (confirm('Non tutti i turni necessari sono stati selezionati, continuare comunque?'))
        this.saveSelections();
    } else
      this.saveSelections();
  }

  @action cancel() {
    this.cancelSelections();
  }
}
