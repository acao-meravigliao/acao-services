import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash, all } from 'rsvp';

export default Route.extend({
  session: service(),
  moment: service(),

  beforeModel(transition) {
console.log("PPPPPPPPPPPPPPPPPPPP");
    this.moment.setLocale('it');
  },

  actions: {
//    error(error, transition) {
//      return true;
//    },
  },
});
