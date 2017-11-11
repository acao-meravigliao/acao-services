import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  monthSelect: 'all',
  seasonSelect: 'all',
  includeBusy: false,

  allRosterEntries: Ember.computed(function() {
    return this.get('store').peekAll('ygg--acao--roster-entry');
  }),

  myRosterEntries: Ember.computed('allRosterEntries.@each', function() {
    return this.get('allRosterEntries').filter((item) =>
      (item.belongsTo('person').id() == this.get('session.personId') &&
       item.get('roster_day.date').getFullYear() == this.get('model.rosterStatus.renew_for_year.year')
      )
    );
  }),

  peakRosterEntries: Ember.computed('myRosterEntries.@each', function() {
    return this.get('myRosterEntries').filter((item) =>
      (item.belongsTo('roster_day').value().get('high_season'))
    );
  }),

  filteredRosterDays: Ember.computed('model.rosterDays.@each', 'monthSelect', 'seasonSelect', 'includeBusy', function() {
    return this.get('model.rosterDays').filter((item) =>
      (
       item.get('date').getFullYear() == this.get('model.rosterStatus.renew_for_year.year') && (
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

  actions: {
    addDay(dayEntry) {
      this.get('store').createRecord('ygg--acao--roster-entry', {
        person: this.get('store').peekRecord('ygg--core--person', this.get('session.personId')),
        roster_day: dayEntry,
        chief: true,
      });
    },

    delEntry(entry) {
      entry.deleteRecord();
    },

    save() {
      this.get('store').peekAll('ygg--acao--roster-entry').forEach(function(record) {
        if (record.get('hasDirtyAttributes')) {
          console.log("HAS_DIRTY_ATTRIBUTES", record);
          record.save();
return;
        }
      });
    },

    cancel() {
      this.get('store').peekAll('ygg--acao--roster-entry').forEach(function(record) { record.rollbackAttributes(); });
    },
  },
});
