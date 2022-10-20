import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash } from 'rsvp';

export default class AuthenShopRoute extends Route {
  @service store;

  model(params) {
//    return hash({
//      services: this.store.query('ygg--acao--service-type', { filter: { available_for_shop: true } }).then((items) =>
//        (this.store.peekAll('ygg--acao--service-type').filterBy('available_for_shop', true))
//      ),
//    });
  }
}
