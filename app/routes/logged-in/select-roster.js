import Route from '@ember/routing/route';
import $ from 'jquery';
import { hash } from 'rsvp';

export default Route.extend({

  model(params) {
    return hash({
      rosterEntries: this.store.query('ygg--acao--roster-entry', { filter: { person_id: this.get('session.personId') } }),
      rosterDays: this.store.findAll('ygg--acao--roster-day'),
      rosterStatus: $.getJSON('/ygg/acao/roster_entries/status'),
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
