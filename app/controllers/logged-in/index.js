import Controller from '@ember/controller';
import { sort, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),
  clock: service('my-clock'),
  applicationController: Ember.inject.controller('application'),

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

//  setupCOntroller() {
//    var me = this;
////
////    Ember.run.schedule("afterRender", this, function() {
////      me.get('ws').subscribe('ygg.glideradar.processed_traffic.linobis', me.onMessage, me);
//
//
////      var aircraft = this.aircrafts.get('firstObject');
////console.log("AIRCRAFT=", aircraft);
//
////      setInterval(function() {
////
////        // XXX Measure update time and change refresh time automatically
////        aircrafts.forEach(function(aircraft) {
////          aircraft.set('lat', aircraft.get('lat') + 0.01 - Math.random() * 0.02);
////          aircraft.set('lng', aircraft.get('lng') + 0.01 - Math.random() * 0.02);
////          aircraft.set('cog', Math.random() * 360);
////        });
////      }, 100);
////    });
//  },



  actions: {
  },
});
