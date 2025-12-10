import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as controller } from '@ember/controller';

export default class AuthenFlightIndexController extends Controller {
  @service router;
  @controller('authen') authen_controller;

  queryParams = [ 'sd', 'ed', 'preset', 'cls', 'roles', 'launches', ];

  ed = null;

  constructor() {
    super(...arguments);

    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setDate(date.getDate() - 30);

    this.sd = date.getTime();
  }

  get flights() {
    return this.model.get_cls('ygg--acao--flight');
  }

  get member() {
    return this.authen_controller.member;
  }
}
