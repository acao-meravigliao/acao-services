import Route from '@ember/routing/route';

export default class AuthenFlightRoute extends Route {
  model(params) {
    return this.store.findRecord('ygg--acao--flight', params.id);
  }
}
