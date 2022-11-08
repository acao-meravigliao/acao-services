import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenRosterSelectRoute extends Route {
  @service session;
  @service store;

  model(params) {
    // FIXME, filter server-side roster day by year
    return hash({
      year: parseInt(params.year),
      roster_entries: this.store.query('ygg--acao--roster-entry', { filter: { person_id: this.get('session.person_id') } }),
      all_roster_entries: this.store.findAll('ygg--acao--roster-entry'),
      roster_days: this.store.findAll('ygg--acao--roster-day'),
      roster_status: fetch('/ygg/acao/roster_entries/status', {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
        headers: {
          'Accept': 'application/json',
        },
      }).then((res) => (res.json())).then((st) => ((st.next && st.next.year === params.year) ? st.next : st.current)),
    });
  }

  afterModel(model) {
    if (!model.rosterStatus.can_select_entries)
      this.transitionTo('/');
  }

  @action willTransition(transition) {
    if (this.get('controller.isDirty')) {
      if (confirm('Annulla le modifiche?'))
        this.controller.cancelSelections();
      else
        transition.abort();
    }
  }
}
