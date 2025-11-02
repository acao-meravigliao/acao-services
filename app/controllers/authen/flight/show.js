import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as controller } from '@ember/controller';

export default class AuthenFlightShowController extends Controller {
  @service router;
  @controller('authen') authen_controller;

  get flight() {
    return this.model.get_first('ygg--acao--flight');
  }

  get sorted_token_transactions() {
    return this.flight.token_transactions.sort((a,b) => (a.recorded_at - b.recorded_at));
  }

  get is_aircraft_mine() {
    return this.model.aircraft && this.model.aircraft.is_owned_by(this.authen_controller.model.member);
  }

  @action goto_token_transaction(id) {
    this.router.transitionTo("authen.token.transaction", id);
  }
}
