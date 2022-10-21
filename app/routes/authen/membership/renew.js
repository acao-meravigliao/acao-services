import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { hash } from 'rsvp';
import $ from 'jquery';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import SelectedService from 'acao-services/utils/selected-service';

class WizardState extends EmberObject {
  @tracked current_step = 'index';
  @tracked enable_cav = true;
  @tracked enable_email = true;
  @tracked accept_rules = false;
  @tracked services = A();
  @tracked roster_days = A();
}

export default class AuthenRenewMembershipRoute extends Route {
  @service session;
  @service store;

  model(params) {
    return hash({
      context: $.getJSON('/ygg/acao/memberships/renew').then((context) => (context[params.year])),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.session.person_id } }),
      person: this.session.person,
      service_types: this.store.findAll('ygg--acao--service-type'),
    }).then((res) => {
      res.services = res.context.services.map((x) => new SelectedService({
        type: this.store.peekRecord('ygg--acao--service-type', x.service_type_id),
        extra_info: x.extra_info,
      }));

      return {
        state: new WizardState,
        context: Object.assign(res, res.context),
      };
    });
  }

//  afterModel(model, transition) {
//    if (model.state.current_step != transition.targetName.split('.').pop()) {
//      this.transitionTo(this.routeName + '.' + model.state.current_step);
//    }
//  }
}
