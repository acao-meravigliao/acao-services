
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  enableAdd: Ember.computed('day.@each', 'entries.[]', function() {
    return this.get('entries').every((item) => (item.belongsTo('roster_day').id() != this.get('day.id')))
  }),

  missingChief: Ember.computed('day.roster_entries.@each', function() {
    return !this.get('day.roster_entries').any((item) => (item.get('chief')));
  }),

  missingNonChiefs: Ember.computed('day.roster_entries.@each', function() {
    return Array(this.get('day.needed_people') - this.get('day.roster_entries.length') - (this.get('missingChief') ? 1 : 0));
  }),

  sortedEntries: Ember.computed.sort('day.roster_entries.@each', function(a, b) {
    if (a.get('chief') && !b.get('chief'))
      return -1;
    else if (!a.get('chief') && b.get('chief'))
      return 1;
    else
      return Ember.compare(a.get('person.last_name'), b.get('person.last_name')) ||
             Ember.compare(a.get('person.first_name'), b.get('person.first_name'));
  }),

  actions: {
    add(day) {
      this.get('onAdd')(day);
    },
  },
});
