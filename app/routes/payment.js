import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return hash({
      payment: this.store.findRecord('ygg--acao--payment', params.id, { adapterOptions: { view: 'full' } }),
    });
  },
});
