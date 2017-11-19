
import Ember from 'ember';

export default Ember.Component.extend({
  hasChief: Ember.computed('entry.roster_day.roster_entries.@each.chief', function() {
    return this.get('entry.roster_day.roster_entries').any((item) => (item.get('chief')));
  }),

  hasChiefNotMe: Ember.computed('entry.roster_day.roster_entries.@each.chief', function() {
    return this.get('entry.roster_day.roster_entries').any((item) =>
      (item.get('chief') && item.get('person') != this.get('entry.person')));
  }),

  chiefDisabled: Ember.computed('chiefEnabled', 'hasChiefNotMe', function() {
    return !this.get('chiefEnabled') || this.get('hasChiefNotMe');
  }),

  actions: {
    del(entry) {
      this.get('onDelete')(entry);
    },
  },
});
