import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenAircraftRoute extends BaseRoute {
  @service store;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--acao--aircraft',
      id: params.id,
      dig: [
       {
        from: 'aircraft',
        to: 'aircraft_owner',
        dig: {
          from: 'aircraft_owner',
          to: 'member',
          dig: {
            from: 'acao_member',
            to: 'person',
          },
        },
       },
       {
        from: 'aircraft',
        to: 'club_owner',
       },
       {
        from: 'aircraft',
        to: 'club',
       },
       {
        from: 'aircraft',
        to: 'aircraft_type',
       },
       {
        from: 'aircraft',
        to: 'flarmnet_entry',
       },
       {
        from: 'aircraft',
        to: 'ogn_ddb_entry',
       },
      ],
     },
     {
      type: 'ygg--acao--aircraft-sync-status',
     },
    ]);
  }
}
