import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/object/evented';
import config from 'acao-services/config/environment';

export default class AuthenController extends Controller {
//  @service('vihai-object-streaming') vos;
  @service store;
  @service session;
  @service router;
  @service('shopping-cart') cart;
  @service('my-clock') clock;
  @service hamburger;

  @action hamburger_show() {
    this.hamburger.toggle();
  }

  @action hamburger_hide() {
    this.hamburger.active = false;
  }

  get my_page_title() {
    return 'FIXME';
  }

  get myPayments() {
    return this.store.peekAll('ygg--acao--payment').filter(((x) => (x.person_id == this.session.person_id)));
  }

  get pendingPayments() {
console.log("PENDINGPAYMENTS UPDATE");
    return this.myPayments.filter((x) => (x.state == 'PENDING'));
  }


  // ------------------- Renewal ---------------------
  get myMemberships() {
    return this.model.storeMemberships.filter((x) => (x.person_id == this.session.person_id));
  }

  get currentYear() {
    return this.model.years.findBy('year', this.clock.date.getFullYear());
  }

  get currentRenewIsOpen() {
    return this.currentYear.renew_opening_time &&
           this.clock.date > new Date(this.currentYear.renew_opening_time);
  }

  get currentRenewIsOpenAndNeeded() {
    return this.currentRenewIsOpen &&
           !this.myMemberships.any((item) => (item.get('reference_year_id') == this.get('currentYear.id')));
  }

  get nextYear() {
    return this.get('model.years').findBy('year', this.get('clock.date').getFullYear() + 1);
  }

  get nextRenewIsOpen() {
    return this.get('nextYear.renew_opening_time') &&
           this.get('clock.date') > new Date(this.get('nextYear.renew_opening_time'));
  }

  get nextRenewIsOpenAndNeeded() {
    return this.nextRenewIsOpen &&
           !this.myMemberships.any((item) => (item.get('reference_year_id') == this.get('nextYear.id')));
  }

  get nextRenewIsGoingToOpen() {
    return this.get('nextYear.renew_announce_time') &&
           this.get('nextYear.renew_opening_time') &&
           this.get('clock.time') > new Date(this.get('nextYear.renew_announce_time')) &&
           this.get('clock.time') < new Date(this.get('nextYear.renew_opening_time'));
  }

  // ------------------- Roster ---------------------
  get rosterCurStatus() { return this.model.rosterStatus.current; }
  get rosterNextStatus() { return this.model.rosterStatus.next; }

  @action logout() {
    if (confirm("Sicuro di voler uscire?")) {
      this.session.logout().then(() => {
        this.router.transitionTo(config.login_route);
      });
    }
  }
}
