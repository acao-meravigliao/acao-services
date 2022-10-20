import Route from '@ember/routing/route';

export default class ApplicationErrorRoute extends Route {
  setupController(controller, error) {
    console.log("=============================> APPLICATION ERROR: ", arguments);

    super.setupController(...arguments);
  }
}
