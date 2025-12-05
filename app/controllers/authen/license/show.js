import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenLicenseShowController extends Controller {
  @service session;
  @service router;
  @service toaster;
  @service vos;

  get license() {
    return this.model.get_first('ygg--acao--license');
  }
}
