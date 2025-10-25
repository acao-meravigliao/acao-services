import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { inject as controller } from '@ember/controller';

export default class TokenTransactionController extends Controller {
  @controller('authen') authen_controller;

  get is_aircraft_mine() {
    return this.model.aircraft && this.model.aircraft.is_owned_by(this.authen_controller.model.member);
  }

  get token_transaction() {
    return this.model.get_first('ygg--acao--token-transaction');
  }
}
