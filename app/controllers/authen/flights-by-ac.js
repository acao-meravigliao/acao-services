import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Papa from 'papaparse';
import moment from 'moment';
import { inject as controller } from '@ember/controller';

export default class FlightsController extends Controller {
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

  get member() {
    return this.authen_controller.model.member;
  }
}
