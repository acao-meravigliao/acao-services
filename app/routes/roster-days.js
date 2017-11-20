import Ember from 'ember';

export default Ember.Route.extend({
  mainTitle: 'Tutti i turni di linea',

  queryParams: {
    year: {
      refreshModel: true
    }
  },

  model(params) {
    params.year = params.year || (new Date().getYear() + 1900);

    return this.store.query('ygg--acao--roster-day', { filter: params });
  },
});
