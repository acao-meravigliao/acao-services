
import { computed } from '@ember/object';
import Component from '@ember/component';
import moment from 'moment';

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
    return !this.chiefEnabled || this.hasChiefNotMe;
  }),

  deleteDisabled: computed('entry.{roster_day.date,isNew}', function() {
    return ((new Date()) > moment(this.get('entry.selected_at')).add(7, 'd').toDate()) &&
           !this.get('entry.isNew');
  }),

  actions: {
    del(entry) {
      this.onDelete(entry);
    },
  },
});
