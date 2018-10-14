import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return hash({
      person: this.store.findRecord('ygg--core--person', this.get('session.personId')),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties(this.modelFor('renew-membership').state);
  },
});
