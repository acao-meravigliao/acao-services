import BaseRoute from '../base-route';
import { service } from '@ember/service';

export default class AuthenAircraftRoute extends BaseRoute {
  @service store;

  model(params) {
    return this.select_as_model(
     {
      type: 'ygg--acao--aircraft',
      id: params.id,
      dig: [
       {
        from: 'aircraft',
        to: 'owner',
        dig: {
          from: 'acao_member',
          to: 'person',
        }
       },
       {
        from: 'aircraft',
        to: 'aircraft_type',
       }
      ],
     },
    ).then((res) => {
      return this.store.peekRecord('ygg--acao--aircraft', params.id);
    });
  }

}
