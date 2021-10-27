import Route from '@ember/routing/route';

export default class AuthenRosterDaysRoute extends Route {

  queryParams = {
    year: {
      refreshModel: true,
      replace: true,
    }
  };

  model(params) {
    params.year = parseInt(params.year) || (new Date().getFullYear());
    this.currentYear = params.year;

    return this.store.query('ygg--acao--roster-day', { filter: params });
  }

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('currentYear', this.currentYear);
  }
}
