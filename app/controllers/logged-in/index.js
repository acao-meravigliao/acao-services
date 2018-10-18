import Controller, { inject as controller } from '@ember/controller';
import { sort, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),
  clock: service('my-clock'),
  applicationController: controller('application'),

  //------------------- Renewal -------------------
  renewalContext: alias('applicationController.model.renewalContext'),

  renewIsGoingToOpen: computed('renewalContext.next.@each', 'clock.time', function() {
    return this.get('renewalContext.next.announce_time') &&
           this.get('renewalContext.next.opening_time') &&
           this.get('clock.date') > new Date(this.get('renewalContext.next.announce_time')) &&
           this.get('clock.date') < new Date(this.get('renewalContext.next.opening_time'));
  }),

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
