import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenMedicalShowRoute extends BaseRoute {
  @service store;
  @service vos;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--acao--medical',
      id: params.id,
      dig: [
       {
        from: 'medical',
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
