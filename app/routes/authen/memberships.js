import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenMembershipsRoute extends Route {
  @service session;

  model(params) {
    return this.store.query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }).
             then((x) => this.store.peekAll('ygg--acao--membership').filter((x) => (x.get('person_id') == this.get('session.personId'))));
  }
}
