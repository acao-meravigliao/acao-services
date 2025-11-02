import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

class ServerFailure extends VihaiException { type = 'ServerFailure'; }

export default class AuthenLicenseShowController extends Controller {
  @service session;
  @service router;
  @service toaster;
  @service vos;

  get payment() {
    return this.model.get_first('ygg--acao--license');
  }
}
