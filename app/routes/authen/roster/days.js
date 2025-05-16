import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenRosterDaysRoute extends BaseRoute {
  @service store;
  @service session;

  model(params) {
    params.year = parseInt(params.year) || (new Date().getFullYear());
    this.current_year = params.year;

    return this.select_as_model([
     {
      type: 'ygg--acao--roster-day',
      filter: { date: { between: [ new Date(params.year, 0, 1), new Date(params.year + 1, 0, 1) ] } },
      dig: [
       {
        from: 'day',
        to: 'entry',
       },
      ]
     },
    ]).then((res) => {
      return this.store.peekSelected('ygg--acao--roster-day', res.sel);
    });
  }
}
