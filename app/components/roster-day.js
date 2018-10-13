import { compare } from '@ember/utils';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  sortedEntries: sort('day.roster_entries', function(a, b) {
    return compare(a.get('person.last_name'), b.get('person.last_name')) ||
           compare(a.get('person.first_name'), b.get('person.first_name'));
  }),

  missingEntries: computed('day.{roster_entries.length,needed_people}', function() {
    return Array(Math.max(this.get('day.needed_people') - this.get('day.roster_entries.length'), 0));
  }),

});
