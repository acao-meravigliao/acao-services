import BaseRoute from '../../../base-route';
import { hash } from 'rsvp';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenRenewMembershipRosterSelectRoute extends BaseRoute {
  @service store;
  @service session;
  @service router;

  beforeModel() {
    const wizard = this.modelFor('authen.membership.renew');

    if (wizard.roster_status.will_need_high_season === 0 &&
        wizard.roster_status.will_need_total === 0)
      wizard.skip_to('summary');
  }

  model(params) {
    const wizard = this.modelFor('authen.membership.renew');

    return this.select_as_model({
      type: 'ygg--acao--roster-day',
      filter: { date: { between: [ new Date(wizard.year, 0, 1), new Date(wizard.year + 1, 0, 1) ] } },
      dig: {
        from: 'day',
        to: 'entry',
        dig: {
          from: 'roster_entry',
          to: 'member',
          dig: {
            from: 'acao_member',
            to: 'person',
          },
        },
      }
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    const wizard = this.modelFor('authen.membership.renew');

    controller.selection = wizard.selected_roster_days;
  }
}

//  @action willTransition(transition) {
//    if (this.get('controller.isDirty')) {
//      if (confirm('Annulla le modifiche?'))
//        this.controller.cancelSelections();
//      else
//        transition.abort();
//    }
//  }
