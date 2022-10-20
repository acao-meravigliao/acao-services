import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenRosterTodayRoute extends Route {
  @service store;

  model() {
    return this.store.queryRecord('ygg--acao--roster-day', { filter: { date: new Date('2022-1-2') } });
    return this.store.queryRecord('ygg--acao--roster-day', { filter: { date: new Date() } });
  }
}
