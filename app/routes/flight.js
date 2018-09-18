import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken: 'Volo',

  model(params) {
    return this.store.findRecord('ygg--acao--flight', params.id);
  },
});
