import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash, all } from 'rsvp';

export default Route.extend({
  session: service(),
  moment: service(),

  beforeModel(transition) {
    this.moment.setLocale('it');

    if (!this.get('session.isLoaded'))
      return this.session.load();
  },

  actions: {
//    error(error, transition) {
//      return true;
//    },
  },
});
