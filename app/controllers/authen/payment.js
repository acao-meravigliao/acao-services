import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenPaymentController extends Controller {
  get payment_method_partial() {
    return this.model.payment.payment_method ?
             this.model.payment.payment_method.toLowerCase() :
             'unknown';
  }
}
