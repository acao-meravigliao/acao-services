import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoDebtModel extends Model {
  @attr('string') identifier;
  @attr('date') created_at;
  @attr('date') expires_at;
  @attr('date') completed_at;
  @attr('string') state;
  @attr('string') descr;
  @attr('boolean') pm_card_enabled;
  @attr('boolean') pm_wire_enabled;
  @attr('boolean') pm_check_enabled;
  @attr('boolean') pm_cash_enabled;
  @attr('boolean') pm_satispay_enabled;

//  @vosBelongsTo('debt', 'person') person;
  @vosBelongsTo('debt', 'member') member;
  @vosHasMany('debt', 'invoice') invoice;
  @vosHasMany('debt', 'detail') details;
  @vosHasMany('debt', 'payment') payments;
  @vosHasMany('debt', 'onda_invoice_export') onda_invoice_exports;

  get is_pending() {
    return this.state === 'PENDING' ||
           this.state === 'PARTIALLY_PAID';
  }

  get is_completed() {
    return this.state === 'PAID_IN_FULL';
  }

  get total() {
    return this.details.reduce((a,x) => (a + x.count * (x.amount + x.amount * x.vat)), 0);
  }

  get payments_total() {
    return this.payments.reduce((a,x) => (a + x.amount), 0);
  }

  get payments_completed() {
    return this.payments.filter((x) => (x.state === 'COMPLETED'));
  }

  get payments_completed_total() {
    return this.payments_completed.reduce((a,x) => (a + x.amount), 0);
  }

  get payments_needed() {
    return this.total - this.payments_completed_total;
  }

  get payment_needed() {
    return this.total - this.payments_total;
  }

}
