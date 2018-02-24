
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  hasChief: computed('entry.roster_day.roster_entries.@each.chief', function() {
    return this.get('entry.roster_day.roster_entries').any((item) => (item.get('chief')));
  }),

  hasChiefNotMe: computed('entry.roster_day.roster_entries.@each.chief', function() {
    return this.get('entry.roster_day.roster_entries').any((item) =>
      (item.get('chief') && item.get('person') != this.get('entry.person')));
  }),

  chiefDisabled: computed('chiefEnabled', 'hasChiefNotMe', function() {
    return !this.get('chiefEnabled') || this.get('hasChiefNotMe');
  }),

  actions: {
    del(entry) {
      this.get('onDelete')(entry);
    },
  },
});
