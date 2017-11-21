import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  titleToken: 'Turni di linea',

  model(params) {
    return Ember.RSVP.hash({
      rosterEntries: this.store.query('ygg--acao--roster-entry', { filter: { person_id: this.get('session.personId') } }),
      rosterDays: this.store.findAll('ygg--acao--roster-day'),
      rosterStatus: Ember.$.getJSON('/ygg/acao/roster_entries/status'),
    });
  },

  afterModel(model) {
    if (!model.rosterStatus.can_select_entries)
      this.transitionTo('/');
  },

}, AuthenticatedRouteMixin);
