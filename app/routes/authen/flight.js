import BaseRoute from '../base-route';
import { service } from '@ember/service';

export default class AuthenFlightRoute extends BaseRoute {
  @service store;

  model(params) {
    return this.select_as_model(
     {
      type: 'ygg--acao--flight',
      id: params.id,
      dig: [
       {
        from: 'flight',
        to: 'pilot1',
        dig: {
          from: 'acao_member',
          to: 'person',
        }
       },
       {
        from: 'flight',
        to: 'pilot2',
        dig: {
          from: 'acao_member',
          to: 'person',
        }
       },
       {
        from: 'flight',
        to: 'aircraft',
       },
       {
        from: 'flight',
        to: 'takeoff_airfield',
       },
       {
        from: 'flight',
        to: 'landing_airfield',
       },
       {
        from: 'flight',
        to: 'takeoff_location',
       },
       {
        from: 'flight',
        to: 'landing_location',
       },
       {
        from: 'towing',
        to: 'towed_by',
       },
       {
        from: 'towed_by',
        to: 'towing',
       },
       {
        from: 'flight',
        to: 'token_transaction',
       },
      ],
     },
    );
  }
}
