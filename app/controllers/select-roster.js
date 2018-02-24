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
    return this.get('saving') || !this.get('isDirty');
  }),

  allRosterEntries: computed(function() {
    return this.get('store').peekAll('ygg--acao--roster-entry');
  }),

  myRosterEntries: computed('allRosterEntries.{@each,@each.isDeleted}', function() {
    return this.get('allRosterEntries').filter((item) =>
      (item.belongsTo('person').id() == this.get('session.personId') &&
       item.get('roster_day.date').getFullYear() == this.get('model.rosterStatus.renew_for_year')
      )
    );
  }),

  isDirty: computed('myRosterEntries.{@each,@each.isDeleted}', function() {
    return this.get('myRosterEntries').any((record) => (record.get('hasDirtyAttributes') || record.get('isDeleted')));
  }),

  peakRosterEntries: computed('myRosterEntries.@each', function() {
    return this.get('myRosterEntries').filter((item) =>
      (item.belongsTo('roster_day').value().get('high_season'))
    );
  }),

  rosterDaysSortOrder: ['date'],
  rosterDaysSorted: sort('model.rosterDays', 'rosterDaysSortOrder'),

  filteredRosterDays: computed('rosterDaysSorted.@each', 'monthSelect', 'seasonSelect', 'includeBusy', function() {
    return this.get('rosterDaysSorted').filter((item) =>
      (
       item.get('date').getFullYear() == this.get('model.rosterStatus.renew_for_year') && (
       (this.get('seasonSelect') == 'all' ||
       (this.get('seasonSelect') == 'high' && item.get('high_season')) ||
       (this.get('seasonSelect') == 'low' && !item.get('high_season'))) &&
       (this.get('includeBusy') ? true : (item.get('roster_entries.length') < item.get('needed_people'))) &&
       (this.get('monthSelect') == 'all' || Number(this.get('monthSelect')) == item.get('date').getMonth())
      ))
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
    return !this.get('requisiteEntriesMissing') && !this.get('isDirty');
  }),

  actions: {
    addDay(dayEntry) {
      this.get('store').createRecord('ygg--acao--roster-entry', {
        person: this.get('store').peekRecord('ygg--core--person', this.get('session.personId')),
        roster_day: dayEntry,
        chief: this.get('model.rosterStatus.possible_roster_chief') &&
               !dayEntry.get('roster_entries').any((item) => (item.get('chief'))),
      });
    },

    delEntry(entry) {
      entry.deleteRecord();
    },

    save() {
      let me = this;
      let promises = [];

      this.set('saving', true);

      this.get('store').peekAll('ygg--acao--roster-entry').forEach(function(record) {
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
      this.get('store').peekAll('ygg--acao--roster-entry').forEach(function(record) { record.rollbackAttributes(); });
    },
  },
});
