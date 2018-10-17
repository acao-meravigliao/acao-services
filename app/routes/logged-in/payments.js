import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('ygg--acao--payment', { params: { filter: { person_id: this.get('session.personId') } } });
  },
});
