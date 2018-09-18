import { compare } from '@ember/utils';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  missingChief: computed('day.roster_entries.@each.chief', function() {
    return !this.get('day.roster_entries').any((item) => (item.get('chief')));
  }),

  missingNonChiefs: computed('day.{roster_entries.length,needed_people}', 'missingChief', function() {
    return Array(Math.max(this.get('day.needed_people') - this.get('day.roster_entries.length') - (this.missingChief ? 1 : 0), 0));
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
});
