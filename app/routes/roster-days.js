import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Tutti i turni di linea',

  queryParams: {
    year: {
      refreshModel: true,
      replace: true,
    }
  },

  model(params) {
    params.year = parseInt(params.year) || (new Date().getYear() + 1900);
    this.currentYear = params.year;

    return this.store.query('ygg--acao--roster-day', { filter: params });
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('currentYear', this.currentYear);
  },
});
