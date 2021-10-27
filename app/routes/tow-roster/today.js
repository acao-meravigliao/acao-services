import Route from '@ember/routing/route';

export default class TowRosterTodayRoute extends Route {
  model() {
    return this.store.queryRecord('ygg--acao--tow-roster-day', { filter: { date: new Date() } });
  }
}
