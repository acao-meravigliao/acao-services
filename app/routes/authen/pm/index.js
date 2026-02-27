import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenPmIndexRoute extends BaseRoute {
  @service session;
  @service router;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--acao--member--pm-note',
      dig: {
        from: 'pm_note',
        to: 'member',
        dig: {
          from: 'acao_member',
          to: 'person',
        },
      },
     },
    ]);
  }
}
