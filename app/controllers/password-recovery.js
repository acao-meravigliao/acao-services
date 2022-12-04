import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch, { AbortController } from 'fetch';
import MyException from 'acao-services/utils/my-exception';
import RemoteException from 'acao-services/utils/remote-exception';

class RequestTimeout extends MyException { type = 'RequestTimeout'; }
class ServerFailure extends MyException { type = 'ServerFailure'; }
class ServerError extends RemoteException { }

export default class PasswordRecoveryController extends Controller {
  @service session;

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
    this.submitting = true;
    this.success = false;

    this.session.recover(this.username).catch((ex) => {
      this.ex = ex;
    }).then(() => {
      this.success = true;
    }).finally(() => {
      this.submitting = false;
    });
  }
}
