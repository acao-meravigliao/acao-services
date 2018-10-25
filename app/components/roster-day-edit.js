import Component from '@ember/component';
import { compare } from '@ember/utils';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  tagName: '',

  sortedEntries: sort('day.roster_entries', function(a, b) {
    return compare(a.get('person.last_name'), b.get('person.last_name')) ||
           compare(a.get('person.first_name'), b.get('person.first_name'));
  }),

  missingEntries: computed('day.{roster_entries.length,needed_people}', function() {
    return Array(Math.max(this.get('day.needed_people') - this.get('day.roster_entries.length'), 0));
  }),

  alreadySelectedByMe: computed('day.@each', 'entries.@each', function() {
    return this.entries.any((item) => (item.belongsTo('roster_day').id() == this.get('day.id')));
  }),

  missingAny: computed('day.{roster_entries.length,needed_people}', function() {
    return this.get('day.roster_entries.length') < this.get('day.needed_people');
  }),

  chiefNeeded: computed('day.{roster_entries.length,needed_people}', function() {
    return (this.get('day.roster_entries.length') == this.get('day.needed_people') - 1) &&
           !this.get('day.roster_entries').any((item) => (item.get('person.acao_roster_chief')));
  }),

  addDisabledReason: computed('day.@each', 'entries.[]', 'missingAny', 'alreadySelectedByMe', 'chiefNeeded', function() {
    if (!this.get('missingAny'))
      return "Turno Pieno";
    else if (this.get('alreadySelectedByMe'))
      return "Turno già selezionato";
    else if (this.get('chiefNeeded') && !this.get('canBeChief'))
      return "È richiesto un capolinea e non sei abilitato a fare il capolinea";
    else if (this.get('day.date') <= moment().add(2, 'd').toDate())
      return "Troppo tardi, questa giornata è chiusa";
    else
      return null;
  }),

  actions: {
    add(day) {
      this.onAdd(day);
    },
  },
});
