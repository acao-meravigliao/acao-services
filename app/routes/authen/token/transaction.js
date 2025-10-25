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
        dig: {
          from: 'aircraft',
          to: 'aircraft_owner',
          dig: {
            from: 'aircraft_owner',
            to: 'member',
          }
        }
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
    );
  }
}
