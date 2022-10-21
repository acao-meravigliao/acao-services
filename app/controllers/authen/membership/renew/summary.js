import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class RenewSummaryMembershipController extends Controller {
  @service router;
  @controller('authen.membership.renew') wizard;

  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }

  get ass_service() {
    return this.wizard.serviceTypes.findBy('symbol', this.context.ass_type);
  }

  get cav_service() {
    return this.enable_cav ? this.wizard.serviceTypes.findBy('symbol', this.context.cav_type) : null;
  }

  get total() {
    return this.ass_service.price +
           (this.enable_cav ? this.cav_service.price : 0) +
           this.services.reduce(function(previous, service) {
             return previous + service.type.price;
           }, 0);
  }

  @action submit() {
    var me = this;

    let req = {
      with_cav: this.state.enable_cav,
      enable_email: this.state.enable_email,
      payment_method: this.state.payment_method,
      services: this.state.services.map(function(service) {
        return {
          type_id: service.type.id,
          extra_info: service.extra_info,
        };
      }),
    };

    me.submitting = true;

    fetch('/ygg/acao/memberships/renew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(req),
    }).then((response) => {
      me.set('submitting', false);
      me.transitionToRoute('authen.payment', response.payment_id);
      me.send('refresh_model');
    }).catch((error) => {
      me.set('submitting', false);

      if (error.payload && typeof(error.payload) == 'object') {
        me.set('submitError', error.payload.title + ': ' + error.payload.descr);
      } else {
        me.set('submitError', error.payload);
      }
    });
  }
}
