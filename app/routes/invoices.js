import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('ygg--acao--invoice', { filter: { person_id: this.get('session.personId') } });
  },
});
