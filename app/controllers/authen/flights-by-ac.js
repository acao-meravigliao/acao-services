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
    date.setDate(date.getDate() - 30);

    this.sd = date.getTime();

//    this.range_selected = { start: this.sd, end: this.ed };
  }

  get member() {
    return this.authen_controller.model.member;
  }
}
