import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({

  ws: service('web-socket'),
  session: service('session'),
  cart: service('shopping-cart'),

  headData: service(),

  actions: {
    logout() {
      this.session.logout();
    },

    sidebarToggle(id) {
console.log("ID=", id);
      $(`#${id}`).sidebar('toggle');
    },
  },
});
