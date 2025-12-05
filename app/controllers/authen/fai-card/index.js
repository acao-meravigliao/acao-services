import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenFaiCardIndexController extends Controller {
  get fai_cards() {
    return this.model.get_cls('ygg--acao--fai-card');
  }

  get sorted_fai_cards() {
    return this.fai_cards.sort((a,b) => (b.issued_at - a.issued_at));
  }
}
