import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class BarTransactionController extends Controller {
  @service session;
  @service router;

  get bar_transactions() {
    return this.model.get_all('ygg--acao--bar-transaction');
  }

  get sorted_models() {
    return this.bar_transactions.sort((a,b) => (b.recorded_at - a.recorded_at));
  }

  @action set_span(val) {
    this.router.transitionTo({ queryParams: { span: val.toString() }});
  }
}
