import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  mainTitle: 'Pagamenti pendenti',

  session: Ember.inject.service('session'),

  model() {
    return this.get('store').query('ygg--acao--payment', { filter: { state: 'PENDING', person_id: this.get('session.personId') } });
  },

//  afterModel(model) {
//    if (model.count() == 1)
//      ==> vai diretto
//    }
//  },

}, AuthenticatedRouteMixin);
