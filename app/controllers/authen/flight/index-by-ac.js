import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as controller } from '@ember/controller';
import moment from 'moment';

export default class AuthenFlightIndexByAcController extends Controller {
  @service router;
  @service session;
  @controller('authen') authen_controller;

  queryParams = [ 'sd', 'ed', ];

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
    return this.model.get_all('ygg--acao--flight');
  }

  get member() {
    return this.authen_controller.member;
  }
}
