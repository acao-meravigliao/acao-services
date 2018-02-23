import Ember from 'ember';
import EmberLeafletComponent from 'ember-leaflet/components/leaflet-map';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
  ws: service('web-socket'),
  lat: 45.809836,
  lng: 8.771022,
  zoom: 14,
  mrk: [45.809836, 8.771022],
  icon: L.icon({
    iconUrl: '/assets/glider.svg',
    iconSize: [ 64, 64 ],
  }),

  init: function () {
    var me = this;

    this._super();

//    var aircrafts = this.aircrafts = this.get('store').findAll('aircraft');


    Ember.run.schedule("afterRender", this, function() {
//      me.get('ws').subscribe('ygg.glideradar.processed_traffic.linobis', me.onMessage, me);










//      var aircraft = this.aircrafts.get('firstObject');
//console.log("AIRCRAFT=", aircraft);

//      setInterval(function() {
//
//        // XXX Measure update time and change refresh time automatically
//        aircrafts.forEach(function(aircraft) {
//          aircraft.set('lat', aircraft.get('lat') + 0.01 - Math.random() * 0.02);
//          aircraft.set('lng', aircraft.get('lng') + 0.01 - Math.random() * 0.02);
//          aircraft.set('cog', Math.random() * 360);
//        });
//      }, 100);
    });
  },

  onMessage(msg) {
    var me = this;

//    console.log("MSG=", msg);

    //if (!me.allReady)
    //  return;

    switch(msg.headers.type) {
    case 'TRAFFICS_UPDATE':
      me.onTrafficsUpdate(msg.payload);
    break;
    case 'TRAFFIC_NEW':
      me.onTrafficNew(msg.payload);
    break;
    }
  },

  onTrafficNew: function(msg) {
    var me = this;

//    var tra = me.findOrCreateTraffic(msg.flarm_id);
//
//    tra.plane_info = msg.plane_info;
//
//    me.updateTrafficLabel(tra);
  },

  onTrafficsUpdate: function(msg) {
    var me = this;

//    msg.stations.forEach(function(tra) {
//      var stations = this.get('store').findRecord('stations', station.aircraft_id);
//console.log("AIRCRAFT=", aircraft);
//    });


    msg.traffics.forEach(function(tra) {
      var aircraft = this.get('store').findRecord('aircraft', tra.aircraft_id);
console.log("AIRCRAFT=", aircraft);


    });


//    Ext.Object.each(msg.stations, function(sta_id, sta) {
//      me.onStationUpdate(sta_id, sta);
//    });
//
//    Ext.Object.each(msg.traffics, function(flarm_id, tra) {
//      me.onTrafficUpdate(flarm_id, tra);
//    });
  },



//
//  actions: {
//    foo() {
//console.log("HHHHHHHH", this.icon.getContent());
//    },
//  },
});
