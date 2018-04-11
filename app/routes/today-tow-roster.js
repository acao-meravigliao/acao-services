import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Turni di traino di oggi',

  model() {
    return this.store.queryRecord('ygg--acao--to-roster-day', { filter: { date: new Date() } }).catch(() => null);
  },
});
