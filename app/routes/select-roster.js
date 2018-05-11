import $ from 'jquery';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  titleToken: 'Turni di linea',

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

});
