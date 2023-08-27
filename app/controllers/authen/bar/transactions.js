import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class BarTransactionController extends Controller {
  @service session;

  get sorted_models() {
    return this.model.sortBy('recorded_at').reverse();
  }
}
