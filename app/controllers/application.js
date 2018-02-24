import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({

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
