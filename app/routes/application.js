import Ember from 'ember';

export default Ember.Route.extend({
  ws: Ember.inject.service('web-socket'),

  init() {
    this._super(...arguments);

//    this.get('ws').connect();
  },
});
