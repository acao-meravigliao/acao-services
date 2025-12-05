import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenLicenseIndexController extends Controller {
  get licenses() {
    return this.model.get_cls('ygg--acao--license');
  }

  get sorted_licenses() {
    return this.licenses.sort((a,b) => (b.issued_at - a.issued_at));
  }
}
