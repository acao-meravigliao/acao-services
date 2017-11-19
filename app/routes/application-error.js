import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, error) {
console.log("AOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", error);
    controller.set('reason', error.reason);
    controller.set('reasonText', error.reasonText);
  },
});
