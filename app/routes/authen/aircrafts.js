import BaseRoute from '../base-route';
import { service } from '@ember/service';

export default class AuthenAircraftsRoute extends BaseRoute {
  @service session;
  @service store;

  model(params) {
    return this.select_as_model(
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: {
          from: 'owner',
          to: 'aircraft',
        }
      }
     },
    ).then((res) => {
      return this.store.peekSelected('ygg--acao--aircraft', res.sel);
    });
  }
}
