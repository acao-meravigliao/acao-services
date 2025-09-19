import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FlightController extends Controller {
  @service router;

  get sorted_token_transactions() {
    return this.model.token_transactions.sort((a,b) => (a.recorded_at - b.recorded_at));
  }

  @action goto_token_transaction(id) {
    this.router.transitionTo("authen.token.transaction", id);
  }
}
