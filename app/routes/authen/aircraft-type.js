import Route from '@ember/routing/route';

export default class AuthenAircraftTypeRoute extends Route {
  model(params) {
    return this.store.findRecord('ygg--acao--aircraft-type', params.id);
  }
}
