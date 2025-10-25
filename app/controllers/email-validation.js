import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

class RequestTimeout extends VihaiException { type = 'RequestTimeout'; }
class ServerFailure extends VihaiException { type = 'ServerFailure'; }
class ServerError extends RemoteException { }

export default class EmailValidationController extends Controller {
  @service session;

  @tracked success = false;
  @tracked ex = null;
  @tracked submitting = false;
}
