import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    return hash({
      invoice: this.store.findRecord('ygg--acao--invoice', params.id, { adapterOptions: { view: 'full' } }),
    });
  },
});
