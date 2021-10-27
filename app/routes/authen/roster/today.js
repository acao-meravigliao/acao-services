import Route from '@ember/routing/route';

export default class AuthenRosterTodayRoute extends Route {
  model() {
    return this.store.queryRecord('ygg--acao--roster-day', { filter: { date: new Date() } });
  }
}
