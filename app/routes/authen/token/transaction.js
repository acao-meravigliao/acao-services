import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenTokenTransactionRoute extends BaseRoute {
  @service store;
  @service session;

  model(params) {
    return this.select_as_model(
     {
      type: 'ygg--acao--token-transaction',
      id: params.id,
      dig: [
       {
        from: 'token_transaction',
        to: 'aircraft',
       },
       {
        from: 'token_transaction',
        to: 'flight',
       },
       {
        from: 'token_transaction',
        to: 'invoice',
       },
      ],
     },
    ).then((sel) => {
      return this.store.peekSelected('ygg--acao--token-transaction', sel)[0];
    });
  }
}
