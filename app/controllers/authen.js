import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { on } from '@ember/object/evented';
import $ from 'jquery';

export default class AuthenController extends Controller {
  @service('vihai-object-streaming') vos;
  @service store;
  @service('session') session;
  @service('shopping-cart') car;
  @service('my-clock') clock;
  @service('page-title-list') page_title;

  get my_page_title() {
    return this.page_title.toString();
  }

  get myPayments() {
    return this.store.peekAll('ygg--acao--payment').filter(((x) => (x.person_id == this.session.personId)));
  }

  get pendingPayments() {
console.log("PENDINGPAYMENTS UPDATE");
    return this.myPayments.filter((x) => (x.state == 'PENDING'));
  }


  // ------------------- Renewal ---------------------
  get myMemberships() {
    return this.model.storeMemberships.filter((x) => (x.person_id == this.session.personId));
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

  get sidebarVisible() {
    return ($(window).width() >= 768) ? 'visible' : '';
  }

//  sidebarHandler() {
//    $(window).resize(function() {
//      if($(window).width() >= 768) {
//        $('#main-sidebar').sidebar('show');
//      } else {
//       $('#main-sidebar').sidebar('hide');
//      }
//    }).resize();
//  }.on('init')

  @action logout() {
    if (confirm("Sicuro di voler uscire?")) {
      this.vos.logout().then(() => {
        this.router.transitionTo(config.loginRoute);
      });
    }
  }

  @action sidebarToggle(id) {
    $(`#${id}`).sidebar('toggle');
  }

  @action sidebarClick() {
    if($(window).width() < 768) {
     $('#main-sidebar').sidebar('hide');
    }
  }
}
