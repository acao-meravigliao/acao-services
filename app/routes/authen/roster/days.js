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
      // TODO: Implement a "belongs to selection 'x' filter"

      console.log(this.store.peekAll('ygg--acao--roster-day')[0].date);

      return this.store.peekAll('ygg--acao--roster-day').
               filter((x) => (x.date.getFullYear() === params.year));
    });
  }
}
