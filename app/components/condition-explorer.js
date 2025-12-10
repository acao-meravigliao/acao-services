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
console.log("CCCCCCCCCCCCCCCC1", this.args.conds);
console.log("CCCCCCCCCCCCCCCC2", this.args.symbol);
    return this.args.conds[this.args.symbol];
  }
}
