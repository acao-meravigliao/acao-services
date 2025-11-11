import BaseRoute from '../../base-route';
import { service } from '@ember/service';
import { later } from '@ember/runloop';

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

  afterModel(model) {
    const payment = model.get_first('ygg--acao--payment');

    if (payment.state === 'COMPLETED' &&
        payment.sp_status === 'ACCEPTED' &&
        payment.obj_type === 'Ygg::Acao::BarTransaction') {
      later(this, () => { this.router.transitionTo('authen.bar.transactions') }, 3000);
    } else if (payment.state === 'PENDING' &&
               payment.payment_method === 'SATISPAY' &&
               payment.sp_status === 'PENDING') {
      later(this, this.recheck_state, 1000);
    }
  }

  recheck_state() {
    later(this, () => {
      if (payment.state === 'COMPLETED' &&
          payment.sp_status === 'ACCEPTED' &&
          payment.obj_type === 'Ygg::Acao::BarTransaction')
        this.router.transitionTo('authen.bar.transactions');
    }, 1000);

    later(this, this.recheck_state, 1000);
  }
}
