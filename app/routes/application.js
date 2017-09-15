import Ember from 'ember';

export default Ember.Route.extend({
  ws: Ember.inject.service('web-socket'),

  model() {
    //this.store.push({
    //  data: [
    //   {
    //    id: 1,
    //    type: 'aircraft',
    //    attributes: {
    //      lat: 45.809836,
    //      lng: 8.771022,
    //      cog: 45,
    //      sog: 40,
    //    },
    //    relationships: {}
    //   },
    //  ]
    //});
  },

  init() {
    this._super(...arguments);

//    this.get('ws').connect();
  },
});
