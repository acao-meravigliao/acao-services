import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    return hash({
      payment: this.store.findRecord('ygg--acao--payment', params.id, { adapterOptions: { view: 'full' } }),
    });
  },
});
