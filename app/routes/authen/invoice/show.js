import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenInvoiceShowRoute extends BaseRoute {
  @service store;

  model(params) {
    return this.select_as_model(
     {
      type: 'ygg--acao--invoice',
      id: params.id,
      dig: [
       {
        from: 'invoice',
        to: 'member',
        dig: {
          from: 'acao_member',
          to: 'person',
        }
       },
       {
        from: 'invoice',
        to: 'detail',
        order: { row_number: 'asc' },
       },
      ],
     },
    );
  }
}
