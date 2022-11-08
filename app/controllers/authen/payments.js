import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenPaymentsController extends Controller {
  get sorted_models() {
    return this.model.sortBy('created_at');
  }
}
