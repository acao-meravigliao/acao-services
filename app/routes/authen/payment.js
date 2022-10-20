import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash } from 'rsvp';

export default class AuthenPaymentRoute extends Route {
  @service store;

  model(params) {
    return hash({
      payment: this.store.findRecord('ygg--acao--payment', params.id, { adapterOptions: { view: 'full' } }),
    });
  }
}
