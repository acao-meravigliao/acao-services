import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return hash({
      invoice: this.store.findRecord('ygg--acao--invoice', params.id, { adapterOptions: { view: 'full' } }),
    });
  },
});
