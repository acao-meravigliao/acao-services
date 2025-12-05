import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenMedicalIndexController extends Controller {
  get medicals() {
    return this.model.get_cls('ygg--acao--medical');
  }

  get sorted_medicals() {
    return this.medicals.sort((a,b) => (b.issued_at - a.issued_at));
  }
}
