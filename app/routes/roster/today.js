import Route from '@ember/routing/route';

export default class RosterTodayRoute extends Route {
  model() {
    return this.store.queryRecord('ygg--acao--roster-day', { filter: { date: new Date() } });
  }
}
