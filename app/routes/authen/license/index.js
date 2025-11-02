import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenLicenseIndexRoute extends BaseRoute {
  @service session;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: {
          from: 'member',
          to: 'license',
        },
      },
     },
    ]);
  }
}
