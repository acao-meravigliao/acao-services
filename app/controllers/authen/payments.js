import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenPaymentsController extends Controller {
  get sorted_models() {
    return this.model.sort((a,b) => (b.created_at - a.created_at));
  }
}
