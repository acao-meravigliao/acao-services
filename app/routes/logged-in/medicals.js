import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('ygg--acao--medical', { filter: { pilot_id: this.get('session.personId') } });
  },
});
