import Ember from 'ember';

export default Ember.Controller.extend({
  stateColors: {
    'PENDING': 'orange',
    'COMPLETED': 'green',
  },
});
