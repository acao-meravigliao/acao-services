import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { hash, all } from 'rsvp';
import VosRoute from '@sevio/ember-vos/routes/vos-route';
import config from 'acao-services/config/environment';

export default class AuthenRoute extends VosRoute {
  @service session;
  @service store;
  //@service vos;
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
      this.transitionTo(config.login_route);
    }
  }

  model() {
    //return this.select_as_model([
    // {
    //  type: 'ygg--acao--year',
    // },
    //]).then((res) => {
    //  return {
    //    years: this.store.peekAll('ygg--acao--year'),
    //  };
    //});

    return hash({
      years: this.store.findAll('ygg--acao--year'),
      store_memberships: this.store.peekAll('ygg--acao--membership'),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.session.person_id } }),
      payments: this.store.query('ygg--acao--payment', { filter: { person_id: this.session.person_id } }),
      roster_status: fetch('/ygg/acao/roster_entries/status', {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
        headers: {
          'Accept': 'application/json',
        },
      }).then((res) => (res.json())),
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    this.ms.update({
      store_membership: model.store_memberships,
      years: model.years,
    });
  }

  @action refresh_model() {
    this.refresh();
  }
}
