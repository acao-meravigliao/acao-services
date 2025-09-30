import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { hash, all } from 'rsvp';
import VosRoute from '@vihai/ember-vos/routes/vos-route';
import config from 'acao-services/config/environment';

export default class AuthenRoute extends VosRoute {
  @service session;
  @service store;
  @service vos;
  @service router;
  @service ms;
  @service hamburger;

  constructor() {
    super(...arguments);

    this.session.on('session_becomes_not_authenticated', () => {
      this.router.transitionTo(config.login_route);
    });
  }

  // Close the hamburge menu on route change
  activate() {
    this.router.on('routeWillChange', (transition) => {
      this.hamburger.active = false;
    });
  }

  beforeModel(transition) {

    ///// Interesting idea
    // if (!this.controllerFor('auth').userIsLoggedIn) {
    //   let loginController = this.controllerFor('login');
    //   loginController.previousTransition = transition;
    //   this.router.transitionTo('login');
    // }

    // Trigger session loading if not loaded already, if not authenticated transition to login route
    if (!this.session.is_loaded) {
      this.router.transitionTo(config.login_route);
    } else if (this.session.is_authenticated) {
      return this._super(...arguments);
    } else {
      this.router.transitionTo(config.login_route);
    }
  }

  model() {
    return this.select_as_model([
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
          }
         },
         {
          from: 'member',
          to: 'role',
         },
         {
          from: 'member',
          to: 'debt',
         },
        ],
       },
      ]
     },
     {
      type: 'ygg--acao--year',
      filter: { year: { gte: 2024 } },
     },
    ]).then((res) => {
      return this.vos.class_call('ygg--acao--roster-entry', 'compute_status').then((roster_status) => {
        let person = this.store.peekRecord('ygg--core--person', this.session.person_id);

        return {
          person: person,
          member: person.member,
          roles: person.member.roles.map((x) => (x.symbol)),
          years: this.store.peekSelected('ygg--acao--year', res.sel),
          memberships: this.store.peekSelected('ygg--acao--membership', res.sel),
          invoices: this.store.peekSelected('ygg--acao--invoice', res.sel),
          roster_status: roster_status,
        };
      });
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    this.ms.update({
      memberships: model.memberships,
      years: model.years,
    });
  }

  @action refresh_model() {
    this.refresh();
  }
}
