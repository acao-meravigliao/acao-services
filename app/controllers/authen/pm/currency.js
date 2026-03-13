import Controller, { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PmCurrencyController extends Controller {
  @service vos;
  @service router;
  @controller('authen') authen_controller;

  get member() {
    return this.model.get(this.model.member_id);
  }

  get cs() {
    return this.model.currency_status;
  }
}
