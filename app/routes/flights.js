import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken: 'Voli',

  model(params) {
    return this.get('store').query('ygg--acao--flight', { filter: { person_id: this.get('session.personId') } });
  },
});
