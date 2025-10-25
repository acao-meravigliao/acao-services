import BaseRoute from '../base-route';
import { service } from '@ember/service';

export default class AuthenFlightsByAcRoute extends BaseRoute {
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

    let filter = {};
    if (params.ed)
      filter.takeoff_time = { between: [ new Date(parseInt(params.sd)), new Date(parseInt(params.ed)) ] };
    else
      filter.takeoff_time = { gt: new Date(parseInt(params.sd)) };

    filter.aircraft_id = params.id;

    return this.select_as_model(
     {
      type: 'ygg--acao--flight',
      order: { 'takeoff_time': 'asc' },
      filter: filter,
      dig: [
       {
        from: 'flight',
        to: 'pilot1',
        dig: {
          from: 'acao_member',
          to: 'person',
        },
       },
       {
        from: 'flight',
        to: 'pilot2',
        dig: {
          from: 'acao_member',
          to: 'person',
        },
       },
      ],
     },
    );
  }
}
