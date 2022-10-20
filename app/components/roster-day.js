import Component from '@glimmer/component';
import { compare } from '@ember/utils';

export default class RosterDayComponent extends Component {

  get sorted_entries() {
    return this.args.day.roster_entries.sortBy('last_name', 'first_name');
  }

  get missing_entries() {
    return Array(Math.max(this.args.day.needed_people - this.args.day.roster_entries.length, 0));
  }
}
