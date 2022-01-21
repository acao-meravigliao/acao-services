import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import config from 'acao-services/config/environment';

export default class Login2Controller extends Controller {
  @service session;
  @service router;

  @tracked username = null;
  @tracked username_warning = null;
  @tracked username2 = null;
  @tracked username2_warning = null;
  @tracked password = null;
  @tracked password_warning = null;
  @tracked logging_in = false;
  @tracked ex = null;

  @action username_changed(ev) {
    this.username = ev.target.value;

    if (this.username.indexOf(' ') != -1)
      this.username_warning = "Username contains white spaces";
  }

  @action username2_changed(ev) {
    this.username2 = ev.target.value;

    if (this.username2.indexOf(' ') != -1)
      this.username2_warning = "Username contains white spaces";
  }

  @action password_changed(ev) {
    this.password = ev.target.value;
  }

  @action authenticate() {
    ev.preventDefault();

    this.logging_in = true;

    let username = this.username;
    let username2 = this.username2;

    if (username.indexOf('@') == -1)
      username = username + '@cp.acao.it';

    if (username2.indexOf('@') == -1)
      username2 = username2 + '@cp.acao.it';

    this.session.proxyAuthenticate(username, password, username2).then(() => {
      if (window.PasswordCredential) {
        var c = new PasswordCredential({
          id: this.username,
          password: this.password,
          name: res.session.person ?
            (res.session.person.name || `${res.session.person.first_name} ${res.session.person.last_name}`) :
            null,
        });

        navigator.credentials.store(c);
      }

      this.router.replaceWith(config.authenticatedRoute);
    }).catch((ex) => {
      this.ex = ex;
    }).finally(() => {
      this.logging_in = false;
    });
  }
}
