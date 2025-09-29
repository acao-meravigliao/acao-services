import BaseRoute from '../base-route';
import { service } from '@ember/service';

export default class AuthenAircraftsRoute extends BaseRoute {
  @service session;
  @service store;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: {
          from: 'owner',
          to: 'aircraft',
          dig: {
            from: 'aircraft',
            to: 'aircraft_type',
          },
        }
      }
     },
     {
      type: 'ygg--acao--club',
      filter: { symbol: 'ACAO' },
//      dig: {
//        from: 'club_owner',
//        to: 'aircraft',
//        filter: { available: true },
//        dig: {
//          from: 'aircraft',
//          to: 'aircraft_type',
//        },
//      },
     },
    ]).then((res) => {
      this.club = this.store.peekSelected('ygg--acao--club', res.sel)[0];

      return this.store.peekSelected('ygg--acao--aircraft', res.sel);
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    controller.club = this.club;
  }
}
