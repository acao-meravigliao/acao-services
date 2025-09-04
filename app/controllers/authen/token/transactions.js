import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TokenTransactionController extends Controller {
  @service session;
  @service router;

  get sorted_models() {
    return this.model.sort((a,b) => (b.recorded_at - a.recorded_at));
  }

  @action set_span(val) {
    this.router.transitionTo({ queryParams: { span: val.toString() }});
  }
}
