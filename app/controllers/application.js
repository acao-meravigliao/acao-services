import Ember from 'ember';

export default Ember.Controller.extend({

  ws: Ember.inject.service('web-socket'),
  session: Ember.inject.service('session'),
  //routing: Ember.inject.service('-routing'),

  init: function () {
    this._super();

    this.get('ws').connect();
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    sidebarToggle(id) {
console.log("ID=", id);
      $(`#${id}`).sidebar('toggle');
    },
  },
});
