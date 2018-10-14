import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.query('ygg--acao--aircraft', { filter: { owner_id: this.get('session.personId') } });
  },
});
