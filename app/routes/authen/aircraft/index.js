import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenAircraftsRoute extends BaseRoute {
  @service session;
  @service store;

  model(params) {
    const dig_shared = this.modelFor('authen').get_first('ygg--acao--member').has_role('MAINTENANCE');

    return this.select_as_model([
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: {
          from: 'member',
          to: 'aircraft_owner',
          dig: {
            from: 'aircraft_owner',
            to: 'aircraft',
            dig: {
              from: 'aircraft',
              to: 'aircraft_type',
            },
          },
        },
      },
     },
     {
      type: 'ygg--acao--club',
      filter: { symbol: 'ACAO' },
      dig: dig_shared ? {
        from: 'club_owner',
        to: 'aircraft',
        filter: { available: true },
        dig: {
          from: 'aircraft',
          to: 'aircraft_type',
        },
      } : null,
     },
    ]);
  }
}
