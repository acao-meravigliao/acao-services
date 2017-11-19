import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  monthSelect: 'all',
  seasonSelect: 'all',
  includeBusy: false,

  saveDisabled: Ember.computed('saving', 'isDirty', function() {
    return this.get('saving') || !this.get('isDirty');
  }),

  allRosterEntries: Ember.computed(function() {
    return this.get('store').peekAll('ygg--acao--roster-entry');
  }),

  myRosterEntries: Ember.computed('allRosterEntries.@each', 'allRosterEntries.@each.isDeleted', function() {
    return this.get('allRosterEntries').filter((item) =>
      (item.belongsTo('person').id() == this.get('session.personId') &&
       item.get('roster_day.date').getFullYear() == this.get('model.rosterStatus.renew_for_year')
      )
    );
  }),

  isDirty: Ember.computed('myRosterEntries.@each', 'myRosterEntries.@each.isDeleted', function() {
    return this.get('myRosterEntries').any((record) => (record.get('hasDirtyAttributes') || record.get('isDeleted')));
  }),

  peakRosterEntries: Ember.computed('myRosterEntries.@each', function() {
    return this.get('myRosterEntries').filter((item) =>
      (item.belongsTo('roster_day').value().get('high_season'))
    );
  }),

  rosterDaysSortOrder: ['date'],
  rosterDaysSorted: Ember.computed.sort('model.rosterDays', 'rosterDaysSortOrder'),

  filteredRosterDays: Ember.computed('rosterDaysSorted.@each', 'monthSelect', 'seasonSelect', 'includeBusy', function() {
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

  tooManyEntries: Ember.computed('myRosterEntries.length', 'model.rosterStatus.needed_total', function() {
    return this.get('myRosterEntries.length') > this.get('model.rosterStatus.needed_total')
  }),

  requisiteEntriesMissing: Ember.computed('myRosterEntries.[]', function() {
    return this.get('myRosterEntries.length') < this.get('model.rosterStatus.needed_total') ||
           this.get('peakRosterEntries.length') < this.get('model.rosterStatus.needed_high_season');
  }),

  requisiteEntriesOk: Ember.computed('requisiteEntriesMissing', 'isDirty', function() {
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

      Ember.RSVP.all(promises).then(function() {
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
