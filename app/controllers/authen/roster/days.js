import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedRosterDays: sort('model', 'rosterDaysSortOrder'),

  init() {
    this._super(...arguments);
    this.rosterDaysSortOrder = [ 'date' ];
  },

  prevYear: computed('currentYear', function() { return this.currentYear - 1; }),
  nextYear: computed('currentYear', function() { return this.currentYear + 1; }),
});
