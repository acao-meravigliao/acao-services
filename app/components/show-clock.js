
import Ember from 'ember';

export default Ember.Component.extend({
  ticktock: Ember.inject.service('tick-tock'),

  actions: {
    reset() {
      this.get('ticktock').reset();
    },
  },
});
