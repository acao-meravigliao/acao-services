import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken: 'Aeromobile',

  model(params) {
    return this.get('store').findRecord('ygg--acao--aircraft-type', params.id);
  },
});
