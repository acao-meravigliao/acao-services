import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  membershipRenewalIsAvailable: Ember.computed('model.renewalContext.@each',function() {
    return new Date() > new Date(this.get('model.renewalContext.renew_opening_time')) &&
           !this.get('model.renewalContext.membership');
  }),


//  setupCOntroller() {
//    var me = this;
//  memberships: Ember.computed('session', function() { return this.get('session').get('data.authenticated.auth_person.id') });

//    this.set('person', this.get('store').findRecord('person', personId));
//
//    this.set('memberships', this.get('store').query('membership', { filter: { person_id: personId } }));
//
//
//
////    this.set('memberships', this.get('store').findRecord('person', 2));
//
////    var  = this.aircrafts = this.get('store').findAll('aircraft');
////
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
