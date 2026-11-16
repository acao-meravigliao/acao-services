import WizardPageRoute from './wizard-page-route';
import { hash } from 'rsvp';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenRenewMembershipRosterSelectRoute extends WizardPageRoute {
  @service store;
  @service session;
  @service router;

  model(params) {
    return this.select_as_model({
      type: 'ygg--acao--roster-day',
      filter: { date: { between: [ new Date(this.wizard.year, 0, 1), new Date(this.wizard.year + 1, 0, 1) ] } },
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

    controller.selection = this.wizard.selected_roster_days;
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
