import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class PasswordRecoveryController extends Controller {
  @service ajax;

  @action recover() {
    let me = this;

    let req = {
      acao_code: this.username,
    };

    this.set('success', false);
    this.set('exception', null);
    this.set('submitting', true);

    this.ajax.request('/ygg/acao/password_recovery', {
      method: 'POST',
      data: JSON.stringify(req),
//        dataType: 'json',
      contentType: 'application/json',
    }).then((response) => {
      me.set('submitting', false);
      me.set('success', true);
    }).catch((xhr, status, error) => {
      me.set('submitting', false);

      if (xhr.responseJSON)
        me.set('exception', xhr.responseJSON);
      else {
        me.set('exception', {
          title: 'Request error',
          descr: xhr.responseText,
        });
      }
    });
  }
}
