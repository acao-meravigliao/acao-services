import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TokenTransactionController extends Controller {
  @service session;
  @service router;

  get token_transaction() {
    return this.model.get_first('ygg--acao--token-transaction');
  }
}
