import Controller from '@ember/controller';
//import { service } from '@ember/service';

export default class TokenTransactionController extends Controller {
  get sorted_models() {
    return this.model.sortBy('recorded_at').reverse();
  }
}
