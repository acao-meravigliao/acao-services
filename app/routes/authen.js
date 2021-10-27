import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash, all } from 'rsvp';
import $ from 'jquery';

export default Route.extend({
  session: service(),

  loginRoute: 'login',

  init() {
    this._super(...arguments);

    this.session.on('sessionBecomesNotAuthenticated', () => {
      this.transitionTo(this.loginRoute);
    });
  },

  beforeModel(transition) {
    // Trigger session loading if not loaded already, if not authenticated transition to login route
    if (!this.get('session.isLoaded')) {
      this.transitionTo(this.loginRoute);
    } else if (this.get('session.isAuthenticated')) {
      return this._super(...arguments);
    } else {
      this.transitionTo(this.loginRoute);
    }
  },

  model() {
    return hash({
      years: this.store.findAll('ygg--acao--year'),
      storeMemberships: this.store.peekAll('ygg--acao--membership'),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }),
      pendingPayments: this.store.query('ygg--acao--payment', { filter: { person_id: this.get('session.personId'), state: 'PENDING', } }),
      rosterStatus: $.getJSON('/ygg/acao/roster_entries/status'),
    });
  },

  actions: {
    refreshModel() {
      this.refresh();
    },
  },
});
