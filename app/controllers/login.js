import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later, cancel } from '@ember/runloop';

import config from 'acao-services/config/environment';

export default class LoginController extends Controller {
  @service session;
  @service router;

  @tracked username = '';
  @tracked username_warning = null;
  @tracked password = '';
  @tracked password_show = false;
  @tracked password_warning = null;
  @tracked keep_connected = false;
  @tracked submitting = false;
  @tracked ex = null;

  keyfob_buffer = '';

  constructor() {
    super(...arguments);

    document.addEventListener('keypress', this.keypress.bind(this));
  }

  keypress(ev) {
    if (ev.key == 'Enter') {
      if (this.keyfob_buffer.length === 10) {
        this.authenticate_by_keyfob(this.keyfob_buffer);
      }

      this.keyfob_buffer = '';
    } else if ("0123456789abcdef".includes(ev.key)) {
      this.keyfob_buffer += ev.key;
      this.keyfob_buffer_timer = later(this, () => { this.keyfob_buffer = ''; }, 500);
    } else {
      if (this.keyfob_buffer_timer) {
        cancel(this.keyfob_buffer_timer);
        this.keyfob_buffer_timer = null;
      }

      this.keyfob_buffer = '';
    }
  }


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

  @action password_show_toggle(ev) {
    this.password_show = !this.password_show;

    if (this.password_show)
      later(this, () => { this.password_show = false; }, 8000);
  }

  @action keep_connected_changed(ev) {
    this.keep_connected = ev.target.value;
  }

  get can_submit() {
    return !this.submitting && this.username !== '' && this.password !== '';
  }

  @action authenticate(ev) {
    ev.preventDefault();

    this.password_show = false;

    this.submitting = true;

    let username = this.username;

    if (username.indexOf('@') === -1)
      username = username + '@cp.acao.it';

    this.session.authenticate(username, this.password, { keep_connected: this.keep_connected }).then((res) => {
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
      this.ex = ex;
    }).finally(() => {
      this.submitting = false;
    });
  }

  authenticate_by_keyfob(keyfob_id) {
    this.submitting = true;

    this.session.authenticate_by_keyfob(keyfob_id, { keep_connected: this.keep_connected }).then((res) => {
      this.router.replaceWith(config.authenticated_route);
    }).catch((ex) => {
      this.ex = ex;
    }).finally(() => {
      this.submitting = false;
    });
  }
}
