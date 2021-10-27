import Route from '@ember/routing/route';

export default class AuthenPersonRoute extends Route {
  model(params) {
    return this.store.findRecord('ygg--core--person', params.id);
  }
}
