import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenAircraftsController extends Controller {
  @service session;

  get sorted_models() {
    return this.model.sort((a,b) => (a.registration - a.registration));
  }
}
