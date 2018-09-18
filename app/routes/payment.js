import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend({

  titleToken: 'Pagamenti pendenti',

  model(params) {
    return hash({
      payment: this.store.findRecord('ygg--acao--payment', params.id, { adapterOptions: { view: 'full' } }),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }),
    });
  },

}, AuthenticatedRouteMixin);
