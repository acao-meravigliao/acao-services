import Component from '@glimmer/component';
import { action } from '@ember/object';
import moment from 'moment';

export default class RosterEntryEditComponent extends Component {

//  get hasChief() {
//    return this.args.entry.roster_day.then((x) => x.roster_entries.then((y) => (y.any((item) => (item.get('chief'))))));
//  }
//
//  get hasChiefNotMe() {
//    return false;//this.args.entry.roster_day.roster_entries.any((item) => (item.get('chief') && item.get('person') != this.args.entry.person));
//  }
//
//  get chiefDisabled() {
//    return !this.chiefEnabled || this.hasChiefNotMe;
//  }

  get deleteEnabled() {
    return ((new Date()) < moment(this.args.entry.selected_at).add(7, 'd').toDate()) ||
           this.args.entry.isNew;
  }

  @action del() {
    this.args.onDelete(this.args.entry);
  }
}
