import Ember from 'ember';

export default Ember.Controller.extend({

  ws: Ember.inject.service('web-socket'),

  actions: {
    burpButton() {
      //this.set('cazzo', this.get('cazzo') + 1);

      this.get('ws').connect();
    },
  },
});
