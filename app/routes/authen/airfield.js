import Route from '@ember/routing/route';

export default class AuthenAirfieldRoute extends Route {
  model(params) {
    return this.store.findRecord('ygg--acao--airfield', params.id);
  }
}
