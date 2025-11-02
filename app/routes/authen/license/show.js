import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenLicenseShowRoute extends BaseRoute {
  @service store;
  @service vos;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--acao--license',
      id: params.id,
      dig: [
       {
        from: 'license',
        to: 'member',
        dig: {
          from: 'acao_member',
          to: 'person',
        },
       },
      ],
     },
    ]);
  }
}
