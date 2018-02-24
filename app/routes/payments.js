import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Pagamenti',

  session: service('session'),

  model() {
    return this.store.query('ygg--acao--payment', { filter: { person_id: this.get('session.personId') } });
  },
}, AuthenticatedRouteMixin);
