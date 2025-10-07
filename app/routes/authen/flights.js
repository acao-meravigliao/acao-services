import BaseRoute from '../base-route';
import { service } from '@ember/service';

export default class AuthenFlightsRoute extends BaseRoute {
  @service store;
  @service session;

  queryParams = {
    sd: {
      refreshModel: true,
      replace: true,
    },
    ed: {
      refreshModel: true,
      replace: true,
    },
  };

  model(params) {

    let filter = { takeoff_time: { gt: new Date(parseInt(params.sd)) } };
    if (params.ed) {
      filter.takeoff_time = { between: [ new Date(parseInt(params.sd)), new Date(parseInt(params.ed)) ] };
    }

    return this.select_as_model(
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: [
         {
          from: 'pilot1',
          to: 'flight',
//          select: [ 'recorded_at', 'cnt', 'descr', 'amount', 'unit', 'prev_credit', 'credit' ],
          order: { 'takeoff_time': 'asc' },
          filter: filter,
         },
         {
          from: 'pilot2',
          to: 'flight',
//          select: [ 'recorded_at', 'cnt', 'descr', 'amount', 'unit', 'prev_credit', 'credit' ],
          order: { 'takeoff_time': 'asc' },
          filter: filter,
         },
        ],
      }
     },
    ).then((sel) => {
      return this.store.peekSelected('ygg--acao--flight', sel);
    });
  }
}
