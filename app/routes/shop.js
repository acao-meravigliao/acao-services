import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  mainTitle: 'Shop',

  model(params) {
    return Ember.RSVP.hash({
      services: this.store.query('ygg--acao--service-type', { filter: { available_for_shop: true } }).then((items) =>
        (this.store.peekAll('ygg--acao--service-type').filterBy('available_for_shop', true))
      ),
    });
  },
}, AuthenticatedRouteMixin);
