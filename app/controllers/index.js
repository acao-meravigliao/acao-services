import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),

  allRosterEntries: computed(function() {
    return this.get('store').peekAll('ygg--acao--roster-entry');
  }),

  myNextRosterEntriesUnsorted: computed('allRosterEntries.@each', function() {
    return this.get('allRosterEntries').filter((item) => (
       item.belongsTo('person').id() == this.get('session.personId') &&
       item.belongsTo('roster_day').value().get('date') > new Date()
      )
    );
  }),

  clock: service('my-clock'),

  renewIsOpen: computed('model.{renewalContext.opening_time,memberships.[]}', 'clock.time', function() {
    return this.get('model.renewalContext') &&
           !this.get('model.memberships').any((item) => (item.get('reference_year_id') == this.get('model.renewalContext.renew_for_year_id'))) &&
           this.get('model.renewalContext.opening_time') &&
           this.get('clock.date') > new Date(this.get('model.renewalContext.opening_time'));
  }),

  renewIsGoingToOpen: computed('model.renewalContext.{renewal_time,announce_time}', 'clock.time', function() {
    return this.get('model.renewalContext') &&
           this.get('model.renewalContext.announce_time') &&
           this.get('model.renewalContext.opening_time') &&
           !this.get('model.memberships').any((item) => (item.get('reference_year_id') == this.get('model.renewalContext.renew_for_year_id'))) &&
           this.get('clock.date') > new Date(this.get('model.renewalContext.announce_time')) &&
           this.get('clock.date') < new Date(this.get('model.renewalContext.opening_time'));
  }),

  myNextRosterEntries: sort('myNextRosterEntriesUnsorted', 'rosterEntriesSortOrder'),

  havePendingPayments: computed('model.payments', function() {
    return this.get('model.payments').any((item) => (item.get('state') == 'PENDING'));
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
