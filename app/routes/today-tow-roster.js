import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.queryRecord('ygg--acao--tow-roster-day', { params: { filter: { date: new Date() } } });
  },
});
