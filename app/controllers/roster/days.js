import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  filterComplete: false,
  showSlots: false,

  filteredRosterDays: computed('model', 'filterComplete', function() {
    return this.get('model').filter((x) => (this.get('filterComplete') ? x.get('roster_entries.length') < x.get('needed_people') : true));
  }),

  sortedFilteredRosterDays: sort('filteredRosterDays', 'rosterDaysSortOrder'),

  init() {
    this._super(...arguments);
    this.rosterDaysSortOrder = [ 'date' ];
  },

  prevYear: computed('currentYear', function() { return this.currentYear - 1; }),
  nextYear: computed('currentYear', function() { return this.currentYear + 1; }),
});
