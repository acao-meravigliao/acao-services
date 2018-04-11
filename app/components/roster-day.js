
import { compare } from '@ember/utils';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';
import moment from 'moment';

export default Component.extend({
  tagName: '',

  alreadySelectedByMe: computed('day.@each', 'entries.[]', function() {
    return this.get('entries').every((item) => (item.belongsTo('roster_day').id() != this.get('day.id')))
  }),

  missingChief: computed('day.roster_entries.@each.chief', function() {
    return !this.get('day.roster_entries').any((item) => (item.get('chief')));
  }),

  missingNonChiefs: computed('day.{roster_entries.length,needed_people}', 'missingChief', function() {
    return Array(Math.max(this.get('day.needed_people') - this.get('day.roster_entries.length') - (this.get('missingChief') ? 1 : 0), 0));
  }),

  missingAny: computed('day.{roster_entries.length,needed_people}', function() {
    return this.get('day.roster_entries.length') < this.get('day.needed_people');
  }),

  enableAdd: computed('day.@each', 'entries.[]', 'alreadySelectedByMe',
                            'missingChief', 'missingNonChiefs', 'missingAny', function() {
    return this.get('entries').every((item) => (item.belongsTo('roster_day').id() != this.get('day.id'))) &&
           (this.get('missingChief') || this.get('missingNonChiefs')) &&
           this.get('missingAny') &&
           this.get('day.date') > moment().add(2, 'd').toDate();
  }),

  sortedEntries: sort('day.roster_entries', function(a, b) {
    if (a.get('chief') && !b.get('chief'))
      return -1;
    else if (!a.get('chief') && b.get('chief'))
      return 1;
    else
      return compare(a.get('person.last_name'), b.get('person.last_name')) ||
             compare(a.get('person.first_name'), b.get('person.first_name'));
  }),

  actions: {
    add(day) {
      this.get('onAdd')(day);
    },
  },
});
