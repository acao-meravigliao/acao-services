import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenMedicalShowController extends Controller {
  @service session;
  @service router;
  @service toaster;
  @service vos;

  get medical() {
    return this.model.get_first('ygg--acao--medical');
  }
}
