import Route from '@ember/routing/route';

export default class AuthenAircraftRoute extends Route {
  model(params) {
    return this.store.findRecord('ygg--acao--aircraft', params.id);
  }
}
