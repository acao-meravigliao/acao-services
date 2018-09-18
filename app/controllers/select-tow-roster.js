import { all } from 'rsvp';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),

  monthSelect: 'all',
  seasonSelect: 'all',
  includeBusy: false,

  saveDisabled: computed('saving', 'isDirty', function() {
    return this.saving || !this.isDirty;
  }),

  allRosterEntries: computed(function() {
    return this.store.peekAll('ygg--acao--day-roster-entry');
  }),

  myRosterEntries: computed('allRosterEntries.{@each,@each.isDeleted}', function() {
    return this.allRosterEntries.filter((item) =>
      (item.belongsTo('person').id() == this.get('session.personId'))
    );
  }),

  isDirty: computed('myRosterEntries.{@each,@each.isDeleted}', function() {
    return this.myRosterEntries.any((record) => (record.get('hasDirtyAttributes') || record.get('isDeleted')));
  }),

  peakRosterEntries: computed('myRosterEntries.@each', function() {
    return this.myRosterEntries.filter((item) =>
      (item.belongsTo('roster_day').value().get('high_season'))
    );
  }),

  rosterDaysSorted: sort('model.rosterDays', 'rosterDaysSortOrder'),

  filteredRosterDays: computed('rosterDaysSorted.@each', 'monthSelect', 'seasonSelect', 'includeBusy', function() {
    return this.rosterDaysSorted.filter((item) =>
      (
       item.get('date').getFullYear() == this.get('model.rosterStatus.renew_for_year') && (
       (this.seasonSelect == 'all') &&
       (this.includeBusy ? true : (item.get('roster_entries.length') < item.get('needed_people'))) &&
       (this.monthSelect == 'all' || Number(this.monthSelect) == item.get('date').getMonth())
      ))
    );
  }),

  init() {
    this._super(...arguments);
    this.rosterDaysSortOrder = ['date'];
  },

  actions: {
    addDay(dayEntry) {
      this.store.createRecord('ygg--acao--tow-roster-entry', {
        person: this.store.peekRecord('ygg--core--person', this.get('session.personId')),
        day: dayEntry,
      });
    },

    delEntry(entry) {
      entry.deleteRecord();
    },

    save() {
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
    },

    cancel() {
      this.store.peekAll('ygg--acao--tow-roster-entry').forEach(function(record) { record.rollbackAttributes(); });
    },
  },
});
