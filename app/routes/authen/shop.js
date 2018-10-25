import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
//    return hash({
//      services: this.store.query('ygg--acao--service-type', { filter: { available_for_shop: true } }).then((items) =>
//        (this.store.peekAll('ygg--acao--service-type').filterBy('available_for_shop', true))
//      ),
//    });
  },
});
