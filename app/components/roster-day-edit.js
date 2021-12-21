import Component from '@glimmer/component';
import { action } from '@ember/object';
import { compare } from '@ember/utils';
import { sort } from '@ember/object/computed';
import moment from 'moment';

export default class RosterDayEditComponent extends Component {

  @sort('args.day.roster_entries', function(a, b) {
    return compare(a.get('person.last_name'), b.get('person.last_name')) ||
           compare(a.get('person.first_name'), b.get('person.first_name'));
  }) sortedEntries;

//  get sortedEntries() {
//    let store = this.args.day.store;
//
//    let res = store.peekAll('ygg--acao--roster-entry').
//      filter((x) => {
//        return x.roster_day.id == this.args.day.id;
//      }).
//      sort((a,b) => {
//        return compare(a.person.last_name, b.person.last_name) ||
//               compare(a.person.first_name, b.person.first_name);
//      });
//
//console.log("SORTED ENTRIES=", res);
//
//    return res;
//  }

  get missingEntries() {
    return Array(Math.max(this.args.day.needed_people - this.args.day.roster_entries.length, 0));
  }

  get alreadySelectedByMe() {
    return this.args.entries.any((item) => (item.belongsTo('roster_day').id() == this.args.day.id));
  }

  get missingAny() {
    return this.args.day.roster_entries.length < this.args.day.needed_people;
  }

  get chiefNeeded() {
    return (this.args.day.roster_entries.length == this.args.day.needed_people - 1) &&
           !this.args.day.roster_entries.any((item) => (item.get('person.acao_roster_chief')));
  }

  get addDisabledReason() {
    if (!this.missingAny)
      return "Turno Pieno";
    else if (this.alreadySelectedByMe)
      return "Turno già selezionato";
    else if (this.chiefNeeded && !this.args.canBeChief)
      return "È richiesto un capolinea e non sei abilitato a fare il capolinea";
    else if (this.args.day.date <= moment().add(2, 'd').toDate())
      return "Troppo tardi, questa giornata è chiusa";
    else
      return null;
  }

  @action add(day) {
    this.args.onAdd(day);
  }
}
