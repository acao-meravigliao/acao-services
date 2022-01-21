import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import config from 'acao-services/config/environment';

export default class LoginController extends Controller {
  @service session;
  @service router;

  @tracked logging_in = false;
  @tracked ex = null;

  @action authenticate() {
    let { username, password } = this;

    if (username.indexOf('@') == -1)
      username = username + '@cp.acao.it';

    ev.preventDefault();

    this.logging_in = true;

    this.session.authenticate(username, password).then(() => {
      this.logging_in = false;
      this.router.replaceWith(config.authenticatedRoute);
    }).catch((reason) => {
      this.logging_in = false;
      this.ex = ex;
    });
  }
}
