import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class RosterTodatController extends Controller {
  get day() {
    return this.model.get_first('ygg--acao--roster-day');
  }
}
