import VosRoute from '@vihai/ember-vos/routes/vos-route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { hash, all } from 'rsvp';
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
          to: 'debt',
         },
         {
          from: 'member',
          to: 'role',
         },
        ],
       },
      ]
     },
     {
      type: 'ygg--acao--role',
     },
     {
      type: 'ygg--acao--year',
      filter: { year: { gte: 2024 } },
     },
    ]).then((sel) => {
      this.ms.update({
        passepartout: sel.get_first('ygg--acao--member').roles.some((x) => (x.symbol === 'STAFF')),
        memberships: sel.get_cls('ygg--acao--membership'),
        years: sel.get_cls('ygg--acao--year'),
      });

      return sel;
    });
  }

  @action refresh_model() {
    this.refresh();
  }
}
