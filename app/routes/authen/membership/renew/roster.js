import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenRenewMembershipRosterRoute extends Route {
  @service store;
  @service session;

  model(params) {
    // If we had grafostore
    //
    // {
    //  type: 'ygg--acao--roster-day',
    //  reference_year_id: 'XXXX',
    //  dig: {
    //    from: 'day',
    //    to: 'entry',
    //  },
    // }

    let parent_model = this.modelFor('authen.membership.renew');

    return hash({
      roster_days: this.store.query('ygg--acao--roster-day', { filter: { year: parent_model.year }}),
      roster_entries: this.store.query('ygg--acao--roster-entry', { filter: { year: parent_model.year }}),
      roster_status: $.getJSON('/ygg/acao/roster_entries/status').then((st) => ((st.next && st.next.year == params.year) ? st.next : st.current)),
    });
  }

//  @action willTransition(transition) {
//    if (this.get('controller.isDirty')) {
//      if (confirm('Annulla le modifiche?'))
//        this.controller.cancelSelections();
//      else
//        transition.abort();
//    }
//  }
}

