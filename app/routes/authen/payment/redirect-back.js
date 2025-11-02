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
    ]).then((res) => {
      if (res.get_first('ygg--acao--payment').sp_status === 'PENDING')
        this.vos.call(params.id, 'sp_update', { }).then((upd_res) => {
          if (upd_res.body.sp_status !== 'PENDING')
            this.refresh();
        });

      return res;
    });
  }
}
