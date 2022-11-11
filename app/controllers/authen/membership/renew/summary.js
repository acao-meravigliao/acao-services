import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import MyException from 'acao-services/utils/my-exception';
import RemoteException from 'acao-services/utils/remote-exception';

class ServerResponseFormatError extends MyException { type = 'ServerResponseFormatError'; }

export default class RenewSummaryMembershipController extends Controller {
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  @tracked submitting = false;
  @tracked submit_error;

  get wizard() { return this.wizard_controller.wizard; }

  get ass_service() {
    return this.wizard.service_types.findBy('symbol', this.wizard.ass_type);
  }

  get cav_service() {
    return this.wizard.enable_cav ? this.wizard.service_types.findBy('symbol', this.wizard.cav_type) : null;
  }

  get total() {
    return this.ass_service.price +
           (this.wizard.enable_cav ? this.cav_service.price : 0) +
           this.wizard.services.reduce((previous, service) => (
             previous + service.type.price
           ), 0);
  }

  get can_submit() {
    return !this.submitting;
  }

  @action async submit() {

    let req = {
      with_cav: this.wizard.enable_cav,
      enable_email: this.wizard.enable_email,
      payment_method: this.wizard.payment_method,
      services: this.wizard.services.map((service) => {
        return {
          type_id: service.type.id,
          extra_info: service.extra_info,
        };
      }),
      selected_roster_days: this.wizard.selected_roster_days.map((day) => (day.id)),
    };

    this.submitting = true;

    let res;
    try {
      res = await fetch('/ygg/acao/memberships/renew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify(req),
      });
    } catch(e) {
      this.submit_error = e;
      return;
    } finally {
      this.submitting = false;
    }

console.log("OIOOOOOOOOOOOOOOOOOOOOOOOO 1");
    if (!res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        this.submit_error = new ServerResponseFormatError;
        return;
      }

      let json = await res.json();

      this.submit_error = new RemoteException(json)

      return;
    }

    if (!res.headers.get('content-type').startsWith('application/json')) {
      this.submit_error = new RemoteException;
      return;
    }

    let json = await res.json();

    this.wizard.payment_id = json.payment_id;
    this.wizard.next('confirmation');
    this.send('refresh_model');
  }

  @action back() {
    this.wizard.prev();
  }
}
