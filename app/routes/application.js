import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash, all } from 'rsvp';

export default Route.extend({
  session: service(),
  moment: service(),

  beforeModel() {
    this.moment.setLocale('it');
  },

  model() {
    return hash({
      payments: this.store.peekAll('ygg--acao--payment'),
      renewalContext: $.getJSON('/ygg/acao/memberships/renew'),
      memberships: this.store.query('ygg--acao--membership', { filter: { person_id: this.get('session.personId') } }),
      rosterStatus: $.getJSON('/ygg/acao/roster_entries/status'),

    });
  },


  actions: {
//    error(error, transition) {
//      return true;
//    },
  },
});
