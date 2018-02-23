import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({

  ws: service('web-socket'),
  session: service('session'),
  cart: service('shopping-cart'),

  headData: service(),

  //routing: service('-routing'),

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
