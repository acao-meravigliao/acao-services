import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  mainTitle: 'Pagamenti pendenti',

  model() {
    return this.get('store').query('ygg-acao-payment', { status: 'PENDING' }, { transport: 'HTTP' } );
  },

//  afterModel(model) {
//    if (model.count() == 1)
//      ==> vai diretto
//    }
//  },

}, AuthenticatedRouteMixin);
