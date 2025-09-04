import Component from '@glimmer/component';
import { compare } from '@ember/utils';

export default class RosterDayComponent extends Component {

  get sorted_entries() {
    return this.args.day.roster_entries.sort((a,b) =>
             ((a.last_name && b.last_name && a.last_name.localeCompare(b.last_name)) ||
              (a.first_name && b.first_name && a.first_name.localeCompare(b.first_name))));
  }

  get missing_entries() {
    return Array(Math.max(this.args.day.needed_people - this.args.day.roster_entries.length, 0));
  }
}
