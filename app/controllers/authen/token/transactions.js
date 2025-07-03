import Controller from '@ember/controller';
//import { service } from '@ember/service';

export default class TokenTransactionController extends Controller {
  get sorted_models() {
    return this.model.sort((a,b) => (b.recorded_at - a.recorded_at));
  }
}
