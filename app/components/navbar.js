import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NavbarComponent extends Component {
  @service router;
  @service session;

  @tracked hamburger_active = false;

  @action hamburger_toggle() {
    this.hamburger_active = !this.hamburger_active;
  }

  @action hamburger_show() {
    this.hamburger_active = true;
  }

  @action hamburger_hide() {
    this.hamburger_active = false;
  }

  @action logout() {
    if (confirm("Sicuro di voler uscire?")) {
      this.session.logout().then(() => {
        this.router.transitionTo(config.login_route);
      });
    }
  }
}

