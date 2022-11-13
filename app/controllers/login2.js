import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'acao-services/config/environment';

export default class Login2Controller extends Controller {
  @service session;
  @service router;

  @tracked username = '';
  @tracked username_warning = null;
  @tracked username2 = '';
  @tracked username2_warning = null;
  @tracked password = '';
  @tracked password_show = false;
  @tracked password_warning = null;
  @tracked submitting = false;
  @tracked ex = null;

  @action username_changed(ev) {
    this.username = ev.target.value;

    if (this.username.indexOf(' ') !== -1)
      this.username_warning = 'password_recovery.username.validation.contains_white_spaces';
    else
      this.username_warning = null;
  }

  @action username2_changed(ev) {
    this.username2 = ev.target.value;

    if (this.username2.indexOf(' ') !== -1)
      this.username2_warning = 'password_recovery.username.validation.contains_white_spaces';
    else
      this.username_warning = null;
  }

  @action password_changed(ev) {
    this.password = ev.target.value;
  }

  @action password_show_toggle(ev) {
    this.password_show = !this.password_show;

    if (this.password_show)
      later(this, () => { this.password_show = false; }, 8000);
  }

  get can_submit() {
    return !this.submitting && this.username !== '' && this.password !== '' && this.username2 !== '';
  }

  @action authenticate(ev) {
    ev.preventDefault();

    this.password_show = false;

    this.submitting = true;

    let username = this.username;
    let username2 = this.username2;

    if (username.indexOf('@') === -1)
      username = username + '@cp.acao.it';

    if (username2.indexOf('@') === -1)
      username2 = username2 + '@cp.acao.it';

    this.session.proxy_authenticate(username, this.password, username2).then((res) => {
      if (window.PasswordCredential) {
        let c = new PasswordCredential({
          id: this.username,
          password: this.password,
          name: res.auth_person.name ?
            res.auth_person.name :
            null,
        });

        navigator.credentials.store(c);
      }

      this.router.replaceWith(config.authenticated_route);
    }).catch((ex) => {
      this.ex = ex;
    }).finally(() => {
      this.submitting = false;
    });
  }
}
