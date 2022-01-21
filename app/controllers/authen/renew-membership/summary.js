import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class RenewMembershipSummaryController extends Controller {
  @controller('authen.renew-membership') wizard;
  @service ajax;

  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }

  get assService() {
    return this.get('wizard.serviceTypes').findBy('symbol', this.get('context.ass_type'));
  }

  get cavService() {
    return this.enableCav ? this.get('wizard.serviceTypes').findBy('symbol', this.get('context.cav_type')) : null;
  }

  get total() {
    return this.get('assService.price') +
           (this.enableCav ? this.get('cavService.price') : 0) +
           this.services.reduce(function(previous, service) {
             return previous + service.get('type.price');
           }, 0);
  }

  @action commit() {
    var me = this;

    let req = {
      with_cav: this.get('state.enableCav'),
      enable_email: this.get('state.enableEmail'),
      payment_method: this.get('state.paymentMethod'),
      services: this.get('state.services').map(function(service) {
        return {
          type_id: service.get('type.id'),
          extra_info: service.get('extraInfo'),
        };
      }),
    };

    me.set('submitting', true);
    this.ajax.post('/ygg/acao/memberships/renew', {
      contentType: 'application/json',
      data: req,
    }).then((response) => {
      me.set('submitting', false);
      me.transitionToRoute('authen.payment', response.payment_id);
      me.send('refreshModel');
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
