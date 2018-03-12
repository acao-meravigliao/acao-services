import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken: 'Volo',

  model(params) {
    return this.get('store').findRecord('ygg--acao--flight', params.id);
  },
});
