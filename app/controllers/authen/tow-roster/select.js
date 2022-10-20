import Controller from '@ember/controller';
import { service } from '@ember/service';
import { all } from 'rsvp';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TowRosterSelectController extends Controller {
  @service session;

  monthSelect = 'all';
  seasonSelect = 'all';
  includeBusy = false;

  @tracked rosterDaysSortOrder = ['date'];

  get saveDisabled() {
    return this.saving || !this.isDirty;
  }

  get allRosterEntries() {
    return this.store.peekAll('ygg--acao--day-roster-entry');
  }

  get myRosterEntries() {
    return this.allRosterEntries.filter((item) =>
      (item.belongsTo('person').id() == this.get('session.person_id'))
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

  get rosterDaysSorted() {
    return this.model.rosterDays.sortBy('rosterDaysSortOrder');
  }

  get filteredRosterDays() {
    return this.rosterDaysSorted.filter((item) =>
      (
       item.get('date').getFullYear() == this.get('model.rosterStatus.renew_for_year') && (
       (this.seasonSelect == 'all') &&
       (this.includeBusy ? true : (item.get('roster_entries.length') < item.get('needed_people'))) &&
       (this.monthSelect == 'all' || Number(this.monthSelect) == item.get('date').getMonth())
      ))
    );
  }

  @action addDay(dayEntry) {
    this.store.createRecord('ygg--acao--tow-roster-entry', {
      person: this.store.peekRecord('ygg--core--person', this.get('session.person_id')),
      day: dayEntry,
    });
  }

  @action delEntry(entry) {
    entry.deleteRecord();
  }

  @action save() {
    let me = this;
    let promises = [];

    this.set('saving', true);

    this.store.peekAll('ygg--acao--tow-roster-entry').forEach(function(record) {
      if (record.get('hasDirtyAttributes')) {
        promises.push(record.save());
      }
    });

    all(promises).then(function() {
      me.set('saving', false);
      me.set('saveSuccess', true);
    }).catch((error) => {
      me.set('saving', false);
      me.set('saveError', error.reason);
    });
  }

  @action cancel() {
    this.store.peekAll('ygg--acao--tow-roster-entry').forEach(function(record) { record.rollbackAttributes(); });
  }
}
