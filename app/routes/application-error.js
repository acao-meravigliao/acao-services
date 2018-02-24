import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, error) {
console.log("AOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", error);
    controller.set('reason', error.reason);
    controller.set('reasonText', error.reasonText);
  },
});
