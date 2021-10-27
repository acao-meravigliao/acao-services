import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash, all } from 'rsvp';

export default Route.extend({
  session: service(),
  versionChecker: service(),

  beforeModel(transition) {
    //this.moment.setLocale('it');
    this.versionChecker;
  },

  model() {
    if (!this.get('session.isLoaded'))
      return this.session.load();
  },

  actions: {
//    loading(error, transition) {
//      return true;
//    },
//     error(error, transition) {
//      return true;
//    },
  },
});
