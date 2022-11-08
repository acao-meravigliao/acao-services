import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TestController extends Controller {
  @service router;
  @service toaster;

  @action make_me_a_sandwich() {
    this.toaster.report('No sandwitch for you!', 'danger', { detail: 'Have a toast instead!', timeout: 2500 });
  }
}
