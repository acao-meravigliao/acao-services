import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenTokenTransactionsRoute extends BaseRoute {
  @service store;
  @service session;

  model(params) {
    return this.select_as_model(
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: {
          from: 'member',
          to: 'token_transaction',
          //select: [ 'recorded_at', 'cnt', 'descr', 'amount', 'unit', 'prev_credit', 'credit' ],
          order: { 'recorded_at': 'desc' },
          start: params.start || 0,
          limit: 50,
        }
      }
     },
    ).then((res) => {
      return this.store.peekSelected('ygg--acao--token-transaction', res.sel);
    });
  }
}
