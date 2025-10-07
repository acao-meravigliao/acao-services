import BaseRoute from '../base-route';
import { service } from '@ember/service';

export default class AuthenInvoicesRoute extends BaseRoute {
  @service session;
  @service store;

  queryParams = {
    span: {
      refreshModel: true,
      replace: true,
    }
  };

  model(params) {
    params.span = parseInt(params.span) || 30;
    this.span = params.span;

    return this.select_as_model(
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: {
          from: 'member',
          to: 'invoice',
//          select: [ 'recorded_at', 'cnt', 'descr', 'amount', 'unit', 'prev_credit', 'credit' ],
          order: { document_date: 'desc' },
          filter: { document_date: { gt: new Date(new Date() - this.span * 86400 * 1000) } }
        }
      }
     },
    ).then((sel) => {
      return this.store.peekSelected('ygg--acao--invoice', sel);
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.span = this.span;
  }
}
