import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash } from 'rsvp';

export default class AuthenInvoiceRoute extends Route {
  @service store;

  model(params) {
    return hash({
      invoice: this.store.findRecord('ygg--acao--invoice', params.id, { adapterOptions: { view: 'full' } }),
    });
  }
}
