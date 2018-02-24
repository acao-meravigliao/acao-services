import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  rosterDaysSortOrder: [ 'date' ],
  sortedRosterDays: sort('model', 'rosterDaysSortOrder'),

  prevYear: computed('currentYear', function() { return this.get('currentYear') - 1; }),
  nextYear: computed('currentYear', function() { return this.get('currentYear') + 1; }),
});
