import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenRenewMembershipRosterRoute extends Route {
  @service store;
  @service session;
  @service router;

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

    let wizard = this.modelFor('authen.membership.renew');

    return hash({
      roster_days: this.store.query('ygg--acao--roster-day', { filter: { year: wizard.year }}),
      roster_entries: this.store.query('ygg--acao--roster-entry', { filter: { year: wizard.year }}),
      roster_status: fetch('/ygg/acao/roster_entries/get_policy', {
        method: 'POST',
        signal: AbortSignal.timeout(5000),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          year: wizard.year,
          with_cav: true,
        }),
      }).then((res) => (res.json())),
    }).then((res) => {
      wizard.roster_status = res.roster_status;

      if (res.roster_status.high_season === 0 && res.roster_status.total === 0)
        wizard.skip_to('summary');
      else
        return res;
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

