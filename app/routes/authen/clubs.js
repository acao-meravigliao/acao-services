import Route from '@ember/routing/route';

export default class AuthenClubsRoute extends Route {
  model(params) {
    return this.findAll('ygg--acao--club');
  }
}
