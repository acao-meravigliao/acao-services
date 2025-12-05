import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { TrackedMap } from 'tracked-built-ins';

export default class CurrencyExplorerComponent extends Component {
  expanded_symbols = new TrackedMap;

  get cs() {
    return this.args.status;
  }

  get glm() {
    return this.args.status.gld_matrix;
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

  is_expanded = (symbol) => (this.expanded_symbols.get(symbol));

  @action toggle_expand(symbol) {
    this.expanded_symbols.set(symbol, !this.expanded_symbols.get(symbol));
  }
}
