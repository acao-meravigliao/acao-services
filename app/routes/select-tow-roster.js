import $ from 'jquery';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'acao-services/mixins/authenticated-route-mixin';

export default Route.extend({

  titleToken: 'Turni di traino',

  model(params) {
    return hash({
      rosterEntries: this.store.query('ygg--acao--tow-roster-entry', { filter: { person_id: this.get('session.personId') } }),
      rosterDays: this.store.findAll('ygg--acao--tow-roster-day'),
    });
  },

}, AuthenticatedRouteMixin);
