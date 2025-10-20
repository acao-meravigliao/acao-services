import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenDebtIndexRoute extends BaseRoute {
  @service store;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--acao--debt',
      id: params.id,
      dig: [
       {
        from: 'debt',
        to: 'detail',
       },
       {
        from: 'debt',
        to: 'payment',
       },
      ],
     },
    ]);
  }
}
