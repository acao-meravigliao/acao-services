import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenMembershipRenewController extends Controller {
  @service session;
  @service clock;
  @service ms;

  get wizard() { return this.model; }
}
