import Route from '@ember/routing/route';
import $ from 'jquery';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenRenewMembershipRosterRoute extends Route {
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


    // FIXME, filter server-side roster day by year
    return hash({
      year: parseInt(params.year),
      roster_days: this.store.findAll('ygg--acao--roster-day'),
      roster_entries: this.store.findAll('ygg--acao--roster-entry'),
      roster_status: $.getJSON('/ygg/acao/roster_entries/status').then((st) => ((st.next && st.next.year == params.year) ? st.next : st.current)),
    });
  }

  afterModel(model) {
    if (!model.roster_status.can_select_entries)
      this.transitionTo('/');
  }

//  setupController(controller, model) {
//    super.setupController(...arguments);
//    controller.my_roster_entries(this.modelFor('authen.renew-membership').state.my_roster_entries);
//  }

  @action willTransition(transition) {
    if (this.get('controller.isDirty')) {
      if (confirm('Annulla le modifiche?'))
        this.controller.cancelSelections();
      else
        transition.abort();
    }
  }
}

