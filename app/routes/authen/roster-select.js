import Route from '@ember/routing/route';
import $ from 'jquery';
import { hash } from 'rsvp';

export default Route.extend({

  model(params) {
    // FIXME, filter server-side roster day by year
    return hash({
      year: parseInt(params.year),
      rosterEntries: this.store.query('ygg--acao--roster-entry', { filter: { person_id: this.get('session.personId') } }),
      allRosterEntries: this.store.findAll('ygg--acao--roster-entry'),
      rosterDays: this.store.findAll('ygg--acao--roster-day'),
      rosterStatus: $.getJSON('/ygg/acao/roster_entries/status').then((st) => ((st.next && st.next.year == params.year) ? st.next : st.current)),
    });
  },

  afterModel(model) {
    if (!model.rosterStatus.can_select_entries)
      this.transitionTo('/');
  },

  actions: {
    willTransition(transition) {
      if (this.get('controller.isDirty')) {
        if (confirm('Annulla le modifiche?'))
          this.get('controller').cancelSelections();
        else
          transition.abort();
      }
    },
  },
});
