import Route from '@ember/routing/route';

export default class AuthenClubRoute extends Route {
  model(params) {
    return this.store.findRecord('ygg--acao--club', params.id);
  }
}
