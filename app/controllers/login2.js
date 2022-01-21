import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import config from 'acao-services/config/environment';

export default class Login2Controller extends Controller {
  @service session;

  @action authenticate() {
    let { username, password, username2 } = this;

    if (username.indexOf('@') == -1)
      username = username + '@cp.acao.it';

    if (username2.indexOf('@') == -1)
      username2 = username2 + '@cp.acao.it';

    ev.preventDefault();

    this.logging_in = true;

    this.session.proxyAuthenticate(username, password, username2).then(() => {
      this.logging_in = false;
      this.router.replaceWith(config.authenticatedRoute);
    }).catch((reason) => {
      this.logging_in = false;

      this.error_message = this.intl.t(ex.type) || this.intl.t(ex.title_sym) || ex.title || 'Unspecified error';
      this.error_detail = this.intl.t(ex.detail_sym) || ex.detail;
    });
  }
}
