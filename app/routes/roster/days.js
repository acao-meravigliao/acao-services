import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenRosterDaysRoute extends Route {
  @service store;

  queryParams = {
    year: {
      refreshModel: true,
      replace: true,
    }
  };

  model(params) {
    params.year = parseInt(params.year) || (new Date().getFullYear());
    this.current_year = params.year;

    return this.store.query('ygg--acao--roster-day', { filter: params });
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    controller.current_year = this.current_year;
  }
}
