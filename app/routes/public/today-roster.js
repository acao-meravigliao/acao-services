import Ember from 'ember';

export default Ember.Route.extend({
  mainTitle: 'Turni di linea di oggi',

  model() {
    return this.store.queryRecord('ygg--acao--roster-day', { filter: { date: new Date() } });
  },

});
