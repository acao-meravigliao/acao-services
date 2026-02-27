import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ConditionExplorerComponent extends Component {
  @service router;
  @service session;
  @service store;

  @tracked is_expanded = false;

  @action toggle_expand(symbol) {
    this.is_expanded = !this.is_expanded;
  }

  get ft() {
    return this.args.conds[this.args.symbol];
  }
}
