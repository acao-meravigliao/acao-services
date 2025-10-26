import BaseRoute from '../../base-route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import SelectedService from 'acao-services/utils/selected-service';

import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

class ServerResponseFormatError extends VihaiException { type = 'ServerResponseFormatError'; }

class WizardState extends EmberObject {
  @tracked steps;
  @tracked email_allowed = true;
  @tracked accept_rules = false;
  @tracked services = A();
  @tracked roster_days = A();

  constructor() {
    super(...arguments);

    this.steps = A([]);
  }

  update(args) {
    console.log("WIZARD UPDATE: ", args);

    Object.assign(this, args);
  }

  next(page, args) {
    args = args || {};

    const cur_page = this.current_step[0];

    this.steps.push([ page, args ]);

    if (page === cur_page)
      this.router.transitionTo({ queryParams: args });
    else
      this.router.transitionTo('authen.membership.renew.' + page, { queryParams: args });
  }

  prev(page) {
    if (page) {
      while(this.current_step[0] !== page) {
        this.steps.pop();
      }
    } else if (this.steps.length > 0) {
      this.steps.pop();
    }

    this.transition_to_step(this.current_step);
  }

  get current_step() {
    return this.steps.at(-1);
  }

  restart() {
    this.steps.clear();
    this.steps.push(this.start_from);

    this.transition_to_step(this.current_step);
  }

  skip_to(page, args) {
    this.steps.pop();
    this.next(page, args);
  }

  transition_to_step(step) {
    this.router.transitionTo('authen.membership.renew.' + step[0], { queryParams: step[1] });
  }

//  get aircraft_owned_to_check() {
//    // If 
//
//    this.aircraft_ownerships.find((x) => (this.
//  }

  async submit() {
    let req = {
      year: this.year,
      email_allowed: this.email_allowed,
      privacy_accepted: this.privacy_accepted,
      consent_association: this.consent_association,
      consent_surveillance: this.consent_surveillance,
      consent_accessory: this.consent_accessory,
      consent_profiling: this.consent_profiling,
      consent_magazine: this.consent_magazine,
      consent_fai: this.consent_fai,
      consent_marketing: this.consent_marketing,

      services: this.services.map((service) => {
        return {
          service_type_id: service.type.id,
          enabled: service.enabled,
          extra_info: service.extra_info,
        };
      }),
      selected_roster_days: this.selected_roster_days ?
                              this.selected_roster_days.map((day) => (day.id)) : [],
    };

    let res;
    res = await fetch('/ygg/acao/memberships/renew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json'))
        throw new ServerResponseFormatError;

      let json = await res.json();

      throw new RemoteException(json)
    }

    if (!res.headers.get('content-type').startsWith('application/json')) {
      throw new RemoteException;
    }

    return await res.json();
  }
}

export default class AuthenRenewMembershipRoute extends BaseRoute {
  @service session;
  @service store;
  @service router;

  constructor() {
    super(...arguments);

    this.wizard = new WizardState;
    this.wizard.router = this.router;
    this.wizard.start_from = [ 'bio', {} ];
  }

  beforeModel(transition) {
    super.beforeModel(arguments);

    if (transition.to.localName === 'index' || !this.wizard.current_step)
      this.wizard.restart();
  }

  model(params) {
    const year = parseInt(params.year);

    const model_prm = this.select_as_model([
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: [
       {
        from: 'person',
        to: 'acao_member',
        dig: [
         {
          from: 'member',
          to: 'membership',
          dig: {
            from: 'membership',
            to: 'year',
          },
         },
         {
          from: 'member',
          to: 'aircraft_owner',
          dig: {
            from: 'aircraft_owner',
            to: 'aircraft',
          }
         }
        ],
       },
       {
        from: 'person',
        to: 'contact',
       },
       {
        from: 'person',
        to: 'email',
       },
       {
        from: 'person',
        to: 'birth_location',
       },
       {
        from: 'person',
        to: 'residence_location',
       },
      ],
     },
     {
      type: 'ygg--acao--year',
      filter: { year: year },
     },
     {
      type: 'ygg--acao--service-type',
     }
    ]);

    const context_prm = this.vos.class_call('ygg--acao--membership', 'renew_context', { year: year });

    const roster_prm = this.vos.class_call('ygg--acao--member', 'roster_status', { year: year });

    return all([ model_prm, context_prm, roster_prm ]).then((res) => {
      const sel = res[0];
      const roster_status_res = res[2];

      // Read-only utility values ------------------
      Object.assign(this.wizard, res[1].body);
      this.wizard.person = sel.get_first('ygg--core--person');
      this.wizard.member = sel.get_first('ygg--acao--member');
      this.wizard.memberships = sel.get_all('ygg--acao--membership');
      this.wizard.year_model = sel.get_all('ygg--acao--year').find((x) => (x.year === year));
      this.wizard.service_types = sel.get_all('ygg--acao--service-type');
      this.wizard.aircraft_ownerships = sel.get_all('ygg--acao--aircraft--owner');
      this.wizard.year = this.wizard.year_model.year;
      this.wizard.announce_time = this.wizard.year_model.renew_announce_time;
      this.wizard.opening_time = this.wizard.year_model.renew_opening_time;
      this.wizard.roster_status = roster_status_res.body;

      // Wizard state ------------------

      // Services
      this.wizard.services = A(this.wizard.base_services.map((x) => new SelectedService({
        type: sel.get_one('ygg--acao--service-type', x.service_type_id),
        type_changeable: false,
        removable: x.removable,
        toggable: x.toggable,
        enabled: x.enabled,
        extra_info: x.extra_info,
      })));

      // Roster
      this.wizard.selected_roster_days = [];

      // Mailing consent
      this.wizard.email_allowed = this.wizard.member.email_allowed;

      // Privacy
      this.wizard.privacy_accepted = this.wizard.member.privacy_accepted;
      this.wizard.consent_association = this.wizard.member.consent_association;
      this.wizard.consent_surveillance = this.wizard.member.consent_surveillance;
      this.wizard.consent_accessory = this.wizard.member.consent_accessory;
      this.wizard.consent_profiling = this.wizard.member.consent_profiling;
      this.wizard.consent_magazine = this.wizard.member.consent_magazine;
      this.wizard.consent_fai = this.wizard.member.consent_fai;
      this.wizard.consent_marketing = this.wizard.member.consent_marketing;

      this.wizard.aircraft_checked = this.wizard.aircraft_ownerships.map((x) => ([ x.id, null ]));

      console.log("WIZARD INITIALIZED AS=", this.wizard);

      return this.wizard;
    });
  }
}
