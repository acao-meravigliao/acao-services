import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class InvoicesController extends Controller {
  @service session;
  @service router;

  get sorted_models() {
    return this.model.sort((a,b) => (b.document_date - a.document_date));
  }

  @action set_span(val) {
    this.router.transitionTo({ queryParams: { span: val.toString() }});
  }

  @action open_invoice(val) {
    this.router.transitionTo("authen.invoice", val);
  }
}
