import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RosterSelectorDayComponent extends Component {
  @tracked selected = false;

  constructor() {
    super(...arguments);

    if (this.args.selected)
      this.selected = true;
  }

  get sorted_entries() {
    return this.args.day.entries.sort((a,b) =>
             (a.member.person.last_name.localeCompare(b.member.person.last_name) ||
              a.member.person.first_name.localeCompare(b.member.person.first_name)));
  }

  get missing_entries() {
    return Array(Math.max(this.args.day.needed_people - (this.args.day.entries.length + (this.selected ? 1 : 0)), 0));
  }

  get unavailable() {
    return this.args.day.entries.length >= this.args.day.needed_people ||
           this.args.day.entries.some((x) => (x.member.id === this.args.member.id));
  }

  @action click() {
    if (this.unavailable)
      return;

    if (this.selected) {
      this.selected = false;

      if (this.args.on_del)
        this.args.on_del(this.args.day);
    } else {
      this.selected = true;

      if (this.args.on_add)
        this.args.on_add(this.args.day);
    }
  }
}
