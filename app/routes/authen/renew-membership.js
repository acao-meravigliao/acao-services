import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import $ from 'jquery';
import EmberObject from '@ember/object';

export default Route.extend({
  session: service(),

  model(params) {
    return hash({
      year: parseInt(params.year),
      context: $.getJSON('/ygg/acao/memberships/renew').then((x) => (x[params.year])),
      serviceTypes: this.store.findAll('ygg--acao--service-type'),
      storeMemberships: this.store.peekAll('ygg--acao--membership'),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }),
      state: EmberObject.create({
        currentStep: 'index',
        enableCav: true,
        enableEmail: true,
        acceptRules: false,
      }),
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('state.services',
      model.context.services.map((x) => EmberObject.create({
        type: this.store.peekRecord('ygg--acao--service-type', x.service_type_id),
        extraInfo: x.extra_info,
      })
    ));
  },

  afterModel(model, transition) {
    if (model.state.get('currentStep') != transition.targetName.split('.').pop()) {
      this.transitionTo(this.routeName + '.' + model.state.get('currentStep'));
    }
  },
});
