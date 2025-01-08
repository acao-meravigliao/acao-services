import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class InvoicesController extends Controller {
  @service session;

  get sorted_models() {
    return this.model.sort((a,b) => (b.created_at - a.created_at));
  }
}
