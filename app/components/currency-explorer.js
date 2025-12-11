import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CurrencyExplorerComponent extends Component {

  get cs() {
    return this.args.status;
  }

  get conds() {
    return this.args.status.conds;
  }

  get glm() {
    const mc = this.args.status.matrix_conds;
    return Object.fromEntries(Object.entries(this.args.status.conds).filter(([k,v]) => (mc.includes(k))));
  }

  date_is_within_one_month = (date) => {
    if (date) {
      date = new Date(date);
      const in_a_month = new Date();
      in_a_month.setDate(in_a_month.getDate() + 30);
      return date.getTime() < in_a_month.getTime();
    } else
      return false;
  };

  @tracked debug;
  @action open_debug() {
    this.debug = true;
  }

  get cs_text() {
    return JSON.stringify(this.cs, null, 2);
  }
}
