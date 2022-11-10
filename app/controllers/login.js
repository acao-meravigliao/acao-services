import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'acao-services/config/environment';

export default class LoginController extends Controller {
  @service session;
  @service router;

  @tracked username = '';
  @tracked username_warning = null;
  @tracked password = '';
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

  @action password_changed(ev) {
    this.password = ev.target.value;
  }

  get can_submit() {
    return !this.submitting && this.username !== '' && this.password !== '';
  }

  @action authenticate(ev) {
    ev.preventDefault();

    this.submitting = true;

    let username = this.username;

    if (username.indexOf('@') === -1)
      username = username + '@cp.acao.it';

    this.session.authenticate(username, this.password).then((res) => {
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

      //// Interesting idea
      // let previousTransition = this.previousTransition;
      // if (previousTransition) {
      //   this.previousTransition = null;
      //   previousTransition.retry();
      // } else {
      //   // Default back to homepage
      //   this.router.transitionTo('index');
      // }

      this.router.replaceWith(config.authenticated_route);

    }).catch((ex) => {
console.log("CONTROLLER CATCH", ex, ex.type);
      this.ex = ex;
    }).finally(() => {
      this.submitting = false;
    });
  }
}
