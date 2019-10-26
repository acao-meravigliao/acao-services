import Controller, { inject as controller } from '@ember/controller';
import { sort, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),
  clock: service('my-clock'),
  authenController: controller('authen'),

  //------------------- Renewal -------------------
  currentYear: alias('authenController.currentYear'),
  nextYear: alias('authenController.nextYear'),
  nextRenewIsGoingToOpen: alias('authenController.nextRenewIsGoingToOpen'),

  //------------------- Roster -------------------
  myNextRosterEntries: sort('myNextRosterEntriesUnsorted', 'rosterEntriesSortOrder'),

  allRosterEntries: computed(function() {
    return this.store.peekAll('ygg--acao--roster-entry');
  }),

  myNextRosterEntriesUnsorted: computed('allRosterEntries.@each', function() {
    return this.allRosterEntries.filter((item) => (
       item.belongsTo('person').id() == this.get('session.personId') &&
       item.belongsTo('roster_day').value().get('date') > new Date()
      )
    );
  }),

  init() {
    this._super(...arguments);
    this.rosterEntriesSortOrder = ['roster_day.date'];
  },

  actions: {
  },
});
