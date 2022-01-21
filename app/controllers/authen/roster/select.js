import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { all } from 'rsvp';

export default class RosterSelectController extends Controller {
  @service session;

  @tracked monthSelect = 'all';
  @tracked seasonSelect = 'all';
  @tracked includeBusy = false;
  @tracked rosterDaysSortOrder = ['date'];

  get canBeChief() { return this.session.person.acao_roster_chief; }

  get year() { return this.model.year; }

  get saveDisabled() {
    return this.saving || !this.isDirty;
  }

  get myRosterEntries() {
    return this.get('model.allRosterEntries').filter((item) =>
      (item.belongsTo('person').id() == this.get('session.personId') &&
       item.get('roster_day.date').getFullYear() == this.year
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
    return this.get('model.rosterDays').filter((x) => (x.date.getFullYear() == this.year));
  }

  get rosterDaysSorted() { return this.allRosterDays.sortBy('rosterDaysSortOrder'); }

  get filteredRosterDays() {
    return this.rosterDaysSorted.filter((item) =>
      (
       (this.seasonSelect == 'all' ||
       (this.seasonSelect == 'high' && item.get('high_season')) ||
       (this.seasonSelect == 'low' && !item.get('high_season'))) &&
       (this.includeBusy ? true : (item.get('roster_entries.length') < item.get('needed_people'))) &&
       (this.monthSelect == 'all' || Number(this.monthSelect) == item.get('date').getMonth())
      )
    );
  }

  get tooManyEntries() {
    return this.get('myRosterEntries.length') > this.get('model.rosterStatus.needed_total')
  }

  get requisiteEntriesMissing() {
    return this.get('myRosterEntries.length') < this.get('model.rosterStatus.needed_total') ||
           this.get('peakRosterEntries.length') < this.get('model.rosterStatus.needed_high_season');
  }

  get requisiteEntriesOk() {
    return !this.requisiteEntriesMissing && !this.isDirty;
  }

  cancelSelections() {
    this.store.peekAll('ygg--acao--roster-entry').forEach(function(record) { record.rollbackAttributes(); });
  }

  saveSelections() {
    let me = this;
    let promises = [];

    this.set('saving', true);
    this.set('saveError', null);

    this.myRosterEntries.filter((x) => (x.get('hasDirtyAttributes') || x.get('isDeleted'))).forEach(function(record) {
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
    this.store.createRecord('ygg--acao--roster-entry', {
      person: this.store.peekRecord('ygg--core--person', this.get('session.personId')),
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
