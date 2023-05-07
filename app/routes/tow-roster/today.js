import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenRosterTodayRoute extends Route {
  @service store;

  model() {
    return this.store.queryRecord('ygg--acao--roster-day', { filter: { date: new Date() } });
  }
}
