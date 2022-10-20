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

  constructor() {
    super(...arguments);

    this.session.on('session_becomes_not_authenticated', () => {
      this.router.transitionTo(config.login_route);
    });
  }

  beforeModel(transition) {
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
      storeMemberships: this.store.peekAll('ygg--acao--membership'),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.session.person_id } }),
      payments: this.store.query('ygg--acao--payment', { filter: { person_id: this.session.person_id } }),
      rosterStatus: $.getJSON('/ygg/acao/roster_entries/status'),
    });
  }

  @action refreshModel() {
    this.refresh();
  }
}
