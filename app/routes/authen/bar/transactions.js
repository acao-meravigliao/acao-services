import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenBarTransactionsRoute extends BaseRoute {
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
          to: 'bar_transaction',
          select: [ 'recorded_at', 'cnt', 'descr', 'amount', 'unit', 'prev_credit', 'credit' ],
          order: 'recorded_at',
          start: params.start || 0,
          limit: 50,
        }
      }
     },
    ).then((res) => {
      // TODO: Implement a "belongs to selection 'x' filter"

      return this.store.peekAll('ygg--acao--bar-transaction').
               filter((x) => (x.member.person.id === this.session.person_id));
    });
  }
}
