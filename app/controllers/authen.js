import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'acao-services/config/environment';

export default class AuthenController extends Controller {
//  @service('vihai-object-streaming') vos;
  @service store;
  @service session;
  @service router;
  @service('shopping-cart') cart;
  @service clock;
  @service hamburger;
  @service ms;

  @action hamburger_show() {
    this.hamburger.toggle();
  }

  @action hamburger_hide() {
    this.hamburger.active = false;
  }

  get my_page_title() {
    return 'FIXME';
  }

  get my_payments() {
console.log("YYYYYYYYYYYY1", this.model);
console.log("YYYYYYYYYYYY2", this.model.payments);

    return this.model.payments.filter(((x) => (x.person_id == this.session.person_id)));
  }

  get pending_payments() {
    return this.my_payments.filter((x) => (x.state == 'PENDING'));
  }

  // ------------------- Roster ---------------------
  get roster_cur_status() { return this.model.roster_status.current; }
  get roster_next_status() { return this.model.roster_status.next; }

  @action logout() {
    if (confirm("Sicuro di voler uscire?")) {
      this.session.logout().then(() => {
        this.router.transitionTo(config.login_route);
      });
    }
  }
}
