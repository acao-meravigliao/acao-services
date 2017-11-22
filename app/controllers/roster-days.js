import Ember from 'ember';

export default Ember.Controller.extend({
  rosterDaysSortOrder: [ 'date' ],
  sortedRosterDays: Ember.computed.sort('model', 'rosterDaysSortOrder'),

  prevYear: Ember.computed('currentYear', function() { return this.get('currentYear') - 1; }),
  nextYear: Ember.computed('currentYear', function() { return this.get('currentYear') + 1; }),
});
