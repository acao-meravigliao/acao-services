import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class AuthenPaymentRoute extends Route {
  model(params) {
    return hash({
      payment: this.store.findRecord('ygg--acao--payment', params.id, { adapterOptions: { view: 'full' } }),
    });
  }
}
