import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { hash } from 'rsvp';
import $ from 'jquery';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

class WizardState extends EmberObject {
  @tracked currentStep = 'index';
  @tracked enableCav = true;
  @tracked enableEmail = true;
  @tracked acceptRules = false;
  @tracked services = A();
  @tracked roster_days = A();
}

class SelectedService extends EmberObject {
  type;
  extraInfo;
}

export default class AuthenRenewMembershipRoute extends Route {
  @service session;

  model(params) {
    return hash({
      context: $.getJSON('/ygg/acao/memberships/renew').then((context) => (context[params.year])),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.session.personId } }),
      person: this.session.person,
      service_types: this.store.findAll('ygg--acao--service-type'),
    }).then((res) => {
      res.services = res.context.services.map((x) => new SelectedService({
        type: this.store.peekRecord('ygg--acao--service-type', x.service_type_id),
        extraInfo: x.extra_info,
      }));

      return {
        state: new WizardState,
        context: Object.assign(res, res.context),
      };
    });
  }

//  afterModel(model, transition) {
//    if (model.state.currentStep != transition.targetName.split('.').pop()) {
//      this.transitionTo(this.routeName + '.' + model.state.currentStep);
//    }
//  }
}
