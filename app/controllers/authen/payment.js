import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class AuthenPaymentsController extends Controller {
  @service session;

  get isPending() { return this.model.payment.state == 'PENDING'; }
  get isPaid() { return this.model.payment.state == 'PAID'; }
  get isCanceled() { return this.model.payment.state == 'CANCELED'; }

//  forMembership: computed('model.{payment,memberships.@each}', function() {
//    return this.get('model.memberships').find((item) =>
//      (item.get('payment.id') == this.get('model.payment.id')));
//  }),

  paymentMethodPartial() {
    return this.get('model.payment.payment_method') ? this.get('model.payment.payment_method').toLowerCase() : 'unknown';
  }
}
