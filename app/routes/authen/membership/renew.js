import BaseRoute from '../../base-route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';
import EmberObject from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';
import SelectedService from 'acao-services/utils/selected-service';
import { VosSelectionSnapshot } from '@vihai/ember-vos';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

class ServerResponseFormatError extends VihaiException { type = 'ServerResponseFormatError'; }

class Wizard extends EmberObject {
  @tracked steps;

  constructor() {
    super(...arguments);

    this.steps = new TrackedArray();
    this.steps.push(new WizardState(this));
  }

  get state() {
    return this.steps.at(-1);
  }

  get person() {
    return this.context_sel.get(this.person_id);
  }

  get member() {
    return this.person.member;
  }

  get aircraft_ownerships() {
    return this.member.aircrafts_as_owner;
  }

  get aircrafts() {
    return this.aircraft_ownerships.map((x) => (x.aircraft));
  }

  entered_page(page, params) {
    if (page === 'index') {
      this.steps.splice(1, Infinity);
      this.do_replace_with();
      return;
    }

    const step_idx = this.steps.findIndex((x) => (x.page === page && !params === !x.params &&
      JSON.stringify(Object.entries(params)) === JSON.stringify(Object.entries(x.params))));

    if (step_idx === -1) {
      this.steps.splice(1, Infinity);
      this.do_replace_with();
    } else
      this.steps.splice(step_idx + 1, Infinity);
  }

  next(page, params) {
    params = params || {};

    //console.log("=============> NEXT", page, params);

    const cur_page = this.state.page;

    const new_status = new WizardState(this);

    // handle first call of "next"
    if (this.state)
      new_status.clone(this.state);

    new_status.page = page;
    new_status.params = params;

    this.steps.push(new_status);

    if (page === cur_page)
      this.router.transitionTo({ queryParams: params });
    else
      this.do_transition();
  }

  next_without_history(page, params) {
    params = params || {};

    //console.log("=============> NEXT_WITHOUT_HISTORY", page, params);

    const cur_page = this.state.page;

    const new_status = new WizardState();

    // handle first call of "next"
    if (this.state)
      new_status.clone(this.state);

    new_status.page = page;
    new_status.params = params;

    this.steps.pop();
    this.steps.push(new_status);

    if (page === cur_page)
      this.router.replaceWith({ queryParams: params });
    else
      this.do_replace_with();
  }

  prev(page) {
    if (page) {
      while(this.state.page !== page) {
        this.steps.pop();
      }
    } else if (this.steps.length > 0) {
      this.steps.pop();
    }

    this.do_transition();
  }

  redirect_to(page, params) {
    this.steps.pop();
    this.next(page, params);
  }

  do_transition() {
    this.router.transitionTo('authen.membership.renew.' + this.state.page, { queryParams: this.state.params });
  }

  do_replace_with() {
    this.router.replaceWith('authen.membership.renew.' + this.state.page, { queryParams: this.state.params });
  }

  update(args) {
    return this.state.update(args);
  }

  submit() {
    return this.state.submit();
  }
}

class WizardState extends EmberObject {
  @tracked page;
  @tracked params;

  @tracked email_allowed = true;
  @tracked accept_rules = false;
  @tracked services = new TrackedArray();
  @tracked roster_days = new TrackedArray();

  constructor(wizard) {
    super(...arguments);

    this.wizard = wizard;
  }

  clone(oth) {
    Object.assign(this, oth.getProperties(Object.keys(oth)));

//    this.sel = new VosSelectionSnapshot(oth.sel);
////    this.sel = oth.sel.snapshot();
    this.services = new TrackedArray(oth.services);
    this.roster_days = new TrackedArray(oth.roster_days);
  }

  update(args) {
    console.log("WIZARD UPDATE: ", args);

    Object.assign(this, args);
  }

  async submit() {
    let req = {
      year: this.wizard.year,
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

    this.wizard = new Wizard;
    this.wizard.router = this.router;
    this.wizard.state.page = 'bio';
    this.wizard.state.params = {};
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

      this.wizard.person_id = this.session.person_id;

      // Read-only utility values ------------------
      Object.assign(this.wizard, res[1].body);

      this.wizard.context_sel = sel;
      this.wizard.memberships = sel.get_cls('ygg--acao--membership');
      this.wizard.year_model = sel.get_cls('ygg--acao--year').find((x) => (x.year === year));
      this.wizard.service_types = sel.get_cls('ygg--acao--service-type');
      this.wizard.year = this.wizard.year_model.year;
      this.wizard.announce_time = this.wizard.year_model.renew_announce_time;
      this.wizard.opening_time = this.wizard.year_model.renew_opening_time;
      this.wizard.roster_status = roster_status_res.body;

      // Wizard state ------------------

      const ws = this.wizard.state;

      ws.sel = sel.snapshot();

      // Mailing consent
      ws.email_allowed = this.wizard.member.email_allowed;

      // Privacy
      ws.privacy_accepted = this.wizard.member.privacy_accepted;
      ws.consent_association = this.wizard.member.consent_association;
      ws.consent_surveillance = this.wizard.member.consent_surveillance;
      ws.consent_accessory = this.wizard.member.consent_accessory;
      ws.consent_profiling = this.wizard.member.consent_profiling;
      ws.consent_magazine = this.wizard.member.consent_magazine;
      ws.consent_fai = this.wizard.member.consent_fai;
      ws.consent_marketing = this.wizard.member.consent_marketing;

      console.log("WIZARD INITIALIZED AS=", this.wizard);

      return this.wizard;
    });
  }

}
