import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenInvoiceShowController extends Controller {
  get invoice() {
    return this.model.get_first('ygg--acao--invoice');
  }
}
