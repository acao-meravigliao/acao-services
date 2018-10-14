import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash, all } from 'rsvp';

export default Route.extend({
  session: service(),
  moment: service(),

  loginRoute: 'login',

  init() {
    this._super(...arguments);

    this.session.on('sessionBecomesNotAuthenticated', () => {
      this.transitionTo(this.loginRoute);
    });
  },

  beforeModel(transition) {

console.log("-------------------------- BEFORE MODEL");
    // Trigger session loading if not loaded already, if not authenticated transition to login route
    if (!this.get('session.isLoaded')) {
      return new Promise((resolve, reject) => {
        this.session.load().then((response) => {
          if (this.get('session.isAuthenticated'))
            resolve(this._super(...arguments));
          else {
            this.transitionTo(this.loginRoute);
            resolve();
          }
        });
      });
    } else if (this.get('session.isAuthenticated')) {
      return this._super(...arguments);
    } else {
      this.transitionTo(this.loginRoute);
    }
  },

  model() {
    return hash({
      payments: this.store.peekAll('ygg--acao--payment'),
      renewalContext: $.getJSON('/ygg/acao/memberships/renew'),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }),
      rosterStatus: $.getJSON('/ygg/acao/roster_entries/status'),

    });
  },

});
