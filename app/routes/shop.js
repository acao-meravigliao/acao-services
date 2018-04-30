import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend({

  titleToken: 'Shop',

  model(params) {
    return hash({
      services: this.store.query('ygg--acao--service-type', { filter: { available_for_shop: true } }).then((items) =>
        (this.store.peekAll('ygg--acao--service-type').filterBy('available_for_shop', true))
      ),
    });
  },
}, AuthenticatedRouteMixin);
