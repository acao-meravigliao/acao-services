import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenInvoiceIndexController extends Controller {
  @service session;
  @service router;

  get invoices() {
    return this.model.get_cls('ygg--acao--invoice');
  }

  get sorted_models() {
    return this.invoices.sort((a,b) => (b.document_date - a.document_date));
  }

  @action set_span(val) {
    this.router.transitionTo({ queryParams: { span: val.toString() }});
  }

  @action open_invoice(val) {
    this.router.transitionTo("authen.invoice.show", val);
  }
}
