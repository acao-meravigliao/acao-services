import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenPaymentShowRoute extends BaseRoute {
  @service store;
  @service vos;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--acao--payment',
      id: params.id,
      dig: [
       {
        from: 'payment',
        to: 'member',
        dig: {
          from: 'acao_member',
          to: 'person',
        },
       },
       {
        from: 'payment',
        to: 'debt',
       },
      ],
     },
    ]);
  }
}
