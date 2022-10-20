import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class PasswordRecoveryController extends Controller {
  @action recover() {
    let me = this;

    let req = {
      acao_code: this.username,
    };

    this.set('success', false);
    this.set('exception', null);
    this.set('submitting', true);

    fetch('/ygg/acao/password_recovery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req),
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
