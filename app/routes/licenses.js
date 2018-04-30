import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Licenze',

  session: service('session'),

  model() {
    return this.store.query('ygg--acao--license', { filter: { pilot_id: this.get('session.personId') } });
  },
}, AuthenticatedRouteMixin);
