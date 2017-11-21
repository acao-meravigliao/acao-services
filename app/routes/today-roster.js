import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Turni di linea di oggi',

  model() {
    return this.store.queryRecord('ygg--acao--roster-day', { filter: { date: new Date() } }).catch(() => null);
  },
});
