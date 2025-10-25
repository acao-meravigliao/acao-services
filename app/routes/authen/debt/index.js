import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenDebtIndexRoute extends BaseRoute {
  @service session;

  queryParams = {
    sd: {
      refreshModel: true,
      replace: true,
    },
    ed: {
      refreshModel: true,
      replace: true,
    },
  };

  model(params) {
    const filter = {
      state: 'PENDING',
      created_at: { gt: new Date(parseInt(params.sd)) }
    };

    if (params.ed) {
      filter.created_at = { between: [ new Date(parseInt(params.sd)), new Date(parseInt(params.ed)) ] };
    }

    return this.select_as_model([
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: {
          from: 'member',
          to: 'debt',
          filter: filter,
          dig: {
            from: 'debt',
            to: 'detail',
          },
        },
      },
     },
    ]);
  }
}
