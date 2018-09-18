import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  moment: service(),

  beforeModel() {
    this.moment.setLocale('it');
  },

  title: function(tokens) {
    return tokens.join(' - ');
  },

  actions: {
//    error(error, transition) {
//      return true;
//    },
  },
});
