import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenRosterDaysRoute extends BaseRoute {
  @service store;

  model(params) {
    let bod = new Date();
    bod.setHours(0,0,0,0);
    let eod = new Date();
    eod.setHours(23,59,59,999);

    return this.select_as_model(
     {
      cls: 'ygg--acao--roster-day',
      filter: { date: { between: [ bod, eod ] } },
      dig: [
       {
        from: 'day',
        to: 'entry',
        dig: {
          from: 'roster_entry',
          to: 'member',
          dig: {
            from: 'acao_member',
            to: 'person',
          },
        },
       },
      ]
     },
    ).then((sel) => {
      // We do return an object otherwise when there is no roster day today, model will be null and we get redirected to home
      return { today: this.store.peekSelected('ygg--acao--roster-day', sel)[0] };
    });
  }
}
