import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.queryRecord('ygg--acao--roster-day', { filter: { date: new Date() } });
  },
});
