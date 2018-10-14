import Route from '@ember/routing/route';
import $ from 'jquery';
import { hash } from 'rsvp';
import EmberObject from '@ember/object';

export default Route.extend({
  model() {
    return hash({
      context: $.getJSON('/ygg/acao/memberships/renew'),
      serviceTypes: this.store.findAll('ygg--acao--service-type'),
      state: EmberObject.create({
        currentStep: 'index',
        enableCav: true,
        enableEmail: true,
        acceptRules: false,
      }),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
console.log("PPPPPPPPPPPPPPPPPPPPP", this.store.peekRecord('ygg--acao--service-type', 6));
    controller.set('state.services',
      model.context.current.services.map((x) => EmberObject.create({
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
