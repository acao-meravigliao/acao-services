import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenAircraftsController extends Controller {
  @service session;
  @service router;

  get sorted_models() {
    return this.model.sort((a,b) => (a.registration - a.registration));
  }

  @action goto_aircraft(id) {
    this.router.transitionTo("authen.aircraft", id);
  }
}
