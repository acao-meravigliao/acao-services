import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

class ServerFailure extends VihaiException { type = 'ServerFailure'; }

export default class AuthenPaymentRedirectBackController extends Controller {
  @service session;
  @service router;
  @service toaster;
  @service vos;

  get payment() {
    return this.model.get_first('ygg--acao--payment');
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    later(this, () => {

console.log("A2");
      if (this.payment.status === 'COMPLETED' &&
          this.payment.sp_status === 'ACCEPTED' &&
          this.payment.obj_type === 'Ygg::Acao::BarTransaction')
        this.router.transitionTo('authen.bar.transactions');
    }, 1000);
  }
}
