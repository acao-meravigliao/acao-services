import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
//import { computed } from '@ember/object';

export default Mixin.create({
  session: service('session'),

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
});
