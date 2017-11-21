import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  titleToken: 'Pagamenti',

  session: Ember.inject.service('session'),

  model() {
    return this.store.query('ygg--acao--payment', { filter: { person_id: this.get('session.personId') } });
  },
}, AuthenticatedRouteMixin);
