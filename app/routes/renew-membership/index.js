import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend({
  titleToken: 'Inizio',

  session: service('session'),

  model() {
    return hash({
      person: this.store.findRecord('ygg--core--person', this.get('session.personId')),
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('context', this.modelFor('renew-membership').context);
    controller.set('state', this.modelFor('renew-membership').state);
    controller.setProperties(this.modelFor('renew-membership').state);
  },
}, AuthenticatedRouteMixin);
