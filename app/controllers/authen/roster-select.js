import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';
import { sort, alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service(),

  monthSelect: 'all',
  seasonSelect: 'all',
  includeBusy: false,

  canBeChief: alias('session.person.acao_roster_chief'),

  year: alias('model.year'),

  saveDisabled: computed('saving', 'isDirty', function() {
    return this.saving || !this.isDirty;
  }),

  myRosterEntries: computed('model.allRosterEntries.@each', function() {
    return this.get('model.allRosterEntries').filter((item) =>
      (item.belongsTo('person').id() == this.get('session.personId') &&
       item.get('roster_day.date').getFullYear() == this.get('year')
      )
    );
  }),

  isDirty: computed('myRosterEntries.{@each,@each.isDeleted,@each.hasDirtyAttributes}', function() {
    return this.myRosterEntries.any((record) => (record.get('hasDirtyAttributes') || record.get('isDeleted')));
  }),

  peakRosterEntries: computed('myRosterEntries.@each', function() {
    return this.myRosterEntries.filter((item) =>
      (item.belongsTo('roster_day').value().get('high_season'))
    );
  }),

  allRosterDays: computed('model.rosterDays.@each', function() {
    return this.get('model.rosterDays').filter((x) => (x.date.getFullYear() == this.year));
  }),

  rosterDaysSorted: sort('allRosterDays', 'rosterDaysSortOrder'),

  filteredRosterDays: computed('rosterDaysSorted.@each', 'monthSelect', 'seasonSelect', 'includeBusy', function() {
    return this.rosterDaysSorted.filter((item) =>
      (
       (this.seasonSelect == 'all' ||
       (this.seasonSelect == 'high' && item.get('high_season')) ||
       (this.seasonSelect == 'low' && !item.get('high_season'))) &&
       (this.includeBusy ? true : (item.get('roster_entries.length') < item.get('needed_people'))) &&
       (this.monthSelect == 'all' || Number(this.monthSelect) == item.get('date').getMonth())
      )
    );
  }),

  tooManyEntries: computed('myRosterEntries.length', 'model.rosterStatus.needed_total', function() {
    return this.get('myRosterEntries.length') > this.get('model.rosterStatus.needed_total')
  }),

  requisiteEntriesMissing: computed('myRosterEntries.[]', function() {
    return this.get('myRosterEntries.length') < this.get('model.rosterStatus.needed_total') ||
           this.get('peakRosterEntries.length') < this.get('model.rosterStatus.needed_high_season');
  }),

  requisiteEntriesOk: computed('requisiteEntriesMissing', 'isDirty', function() {
    return !this.requisiteEntriesMissing && !this.isDirty;
  }),

  init() {
    this._super(...arguments);
    this.rosterDaysSortOrder = ['date'];
  },

  cancelSelections() {
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA CANCEL SELECTIONS");
    this.store.peekAll('ygg--acao--roster-entry').forEach(function(record) { record.rollbackAttributes(); });
  },

  saveSelections() {
    let me = this;
    let promises = [];

    this.set('saving', true);

    this.get('myRosterEntries').filter((x) => (x.get('hasDirtyAttributes') || x.get('isDeleted'))).forEach(function(record) {
      promises.push(record.save());
    });

    all(promises).then(function() {
      me.set('saving', false);
      me.set('saveSuccess', true);
    }).catch((error) => {
      me.set('saving', false);
      me.set('saveError', error.exception ? error.exception.title : 'Unspecified error');
    });
  },

  actions: {
    addDay(dayEntry) {
      this.store.createRecord('ygg--acao--roster-entry', {
        person: this.store.peekRecord('ygg--core--person', this.get('session.personId')),
        roster_day: dayEntry,
      });
    },

    delEntry(entry) {
      entry.deleteRecord();
    },

    save() {
      if (this.get('requisiteEntriesMissing')) {
        if (confirm('Non tutti i turni necessari sono stati selezionati, continuare comunque?'))
          this.saveSelections();
      } else
        this.saveSelections();
    },

    cancel() {
      this.cancelSelections();
    },
  },
});
