import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import MyException from 'acao-services/utils/my-exception';
import RemoteException from 'acao-services/utils/remote-exception';

class RequestTimeout extends MyException { type = 'RequestTimeout'; }
class ServerFailure extends MyException { type = 'ServerFailure'; }
class ServerError extends RemoteException { }

export default class PasswordRecoveryController extends Controller {
  @tracked success = false;
  @tracked ex = null;
  @tracked submitting = false;
  @tracked username = '';
  @tracked username_warning;
  @tracked username_error;

  @action username_changed(ev) {
    this.username = ev.target.value;

    if (this.username.indexOf(' ') !== -1)
      this.username_warning = 'password_recovery.username.validation.contains_white_spaces';
    else
      this.username_warning = null;
  }

  get can_submit() {
    return !this.submitting && this.username.length > 0;
  }

  @action async submit() {
    let req = {
      acao_code: this.username,
    };

    this.success = false;
    this.submitting = true;

    let res;
    try {
      res = await fetch('/ygg/acao/password_recovery', {
        method: 'POST',
        signal: AbortSignal.timeout(5000),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify(req),
      });
    } catch(e) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw(new RequestTimeout);
      } else
        throw(e);
    } finally {
      this.submitting = false;
    }

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      this.success = true;

      return json;

    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      throw(new ServerError(json));
    }
  }
}
