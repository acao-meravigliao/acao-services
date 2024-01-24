import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { hash } from 'rsvp';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import SelectedService from 'acao-services/utils/selected-service';
import fetch, { AbortController } from 'fetch';

class WizardState extends EmberObject {
  @tracked steps = [ 'index' ];
  @tracked enable_email = true;
  @tracked accept_rules = false;
  @tracked services = A();
  @tracked roster_days = A();

  next(page) {
    this.steps.push(page);
    this.router.transitionTo('authen.membership.renew.' + page);
  }

  prev() {
    let prev = this.steps.pop();
    this.router.transitionTo('authen.membership.renew.' + this.current_step);
    return prev;
  }

  get current_step() {
    return this.steps[this.steps.length - 1];
  }

  restart() {
    this.steps = [];
    this.next('index');
  }

  skip_to(page) {
    this.steps.pop();
    this.next(page);
  }
}

export default class AuthenRenewMembershipRoute extends Route {
  @service session;
  @service store;
  @service router;

  constructor() {
    super(...arguments);

    this.wizard = new WizardState;
    this.wizard.router = this.router;
  }

  beforeModel(transition) {
    super.beforeModel(arguments);

    if (transition.to.localName != this.wizard.current_step)
      this.wizard.restart();
  }

  model(params) {
    let abc = new AbortController();
    setTimeout(() => abc.abort(), 5000);

    return hash({
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.session.person_id } }),
      person: this.session.person,
      service_types: this.store.findAll('ygg--acao--service-type'),
      context: fetch('/ygg/acao/memberships/renew', {
        method: 'POST',
        signal: abc.signal,
        headers: {
          'Accept': 'application/json',
        },
      }).then((res) => (res.json())).then((context) => (context[params.year])),
    }).then((res) => {
      Object.assign(this.wizard, res.context);

      this.wizard.memberships = res.memberships;
      this.wizard.person = res.person;
      this.wizard.service_types = res.service_types;

      this.wizard.services = res.context.services.map((x) => new SelectedService({
        type: this.store.peekRecord('ygg--acao--service-type', x.service_type_id),
        type_changeable: false,
        removable: x.removable,
        toggable: x.toggable,
        enabled: x.enabled,
        extra_info: x.extra_info,
      }));

console.log("WIZARD INITIALIZED AS=", this.wizard);

      return this.wizard;
    });
  }
}
