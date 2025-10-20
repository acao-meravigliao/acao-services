import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TokenTransactionsController extends Controller {
  @service session;
  @service router;

  get token_transactions() {
    return this.model.get_all('ygg--acao--token-transaction');
  }

  get sorted_token_transactions() {
    return this.token_transactions.sort((a,b) => (b.recorded_at - a.recorded_at));
  }

  @action set_span(val) {
    this.router.transitionTo({ queryParams: { span: val.toString() }});
  }
}
