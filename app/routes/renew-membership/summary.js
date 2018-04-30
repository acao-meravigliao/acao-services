import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend({
  titleToken: 'Riassunto',

  model() {
    return hash({
      serviceTypes: this.get('store').findAll('ygg--acao--service-type'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    let parentModel = this.modelFor('renew-membership');

    controller.set('context', parentModel.context);
    controller.set('state', parentModel.state);
    controller.setProperties(parentModel.state);
  },

}, AuthenticatedRouteMixin);
