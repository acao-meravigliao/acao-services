import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RosterSelectorDayComponent extends Component {
  constructor() {
    super(...arguments);
  }

  get sorted_entries() {
    return this.args.day.entries.sort((a,b) =>
             (a.member.person.last_name.localeCompare(b.member.person.last_name) ||
              a.member.person.first_name.localeCompare(b.member.person.first_name)));
  }

  get missing_entries() {
    return Array(Math.max(this.args.day.needed_people - (this.args.day.entries.length + (this.args.selected ? 1 : 0)), 0));
  }

  get unavailable() {
    return this.args.day.entries.length >= this.args.day.needed_people ||
           this.args.day.entries.some((x) => (x.member.id === this.args.member.id));
  }

  @action click() {
    if (this.unavailable)
      return;

    if (this.args.selected)
      this.args.on_del && this.args.on_del(this.args.day);
    else
      this.args.on_add && this.args.on_add(this.args.day);
  }
}
