import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.query('ygg--acao--token-transaction', { filter: { person_id: this.get('session.personId') } });
  },
});
