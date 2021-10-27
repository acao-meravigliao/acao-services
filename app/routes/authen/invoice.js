import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class AuthenInvoiceRoute extends Route {
  model(params) {
    return hash({
      invoice: this.store.findRecord('ygg--acao--invoice', params.id, { adapterOptions: { view: 'full' } }),
    });
  }
}
