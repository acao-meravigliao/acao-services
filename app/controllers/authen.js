import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { on } from '@ember/object/evented';
import $ from 'jquery';

export default Controller.extend({
  vos: service('vihai-object-streaming'),
  session: service('session'),
  cart: service('shopping-cart'),
  clock: service('my-clock'),
  headData: service(),

  // -------- Page title hack  -------------------
  pageTitleList: service(),
  myPageTitle: '',

  titleChangeObserver: on('init', observer('pageTitleList.sortedTokens.@each', function() {
    once(this, function() {
      this.set('myPageTitle', this.pageTitleList.toString());
    });
  })),

  allPayments: computed(function() {
    return this.store.peekAll('ygg--acao--payment');
  }),

  pendingPayments: computed('allPayments.@each.state', function() {
console.log("PENDINGPAYMENTS UPDATE");
    return this.allPayments.filter((x) => (x.state == 'PENDING'));
  }),


  // ------------------- Renewal ---------------------
  myMemberships: computed('model.storeMemberships', function() {
    return this.get('model.storeMemberships').filter((x) => (x.person_id == this.get('session.personId')));
  }),

  currentYear: computed('model.years.@each', 'clock.date', function() {
    return this.get('model.years').findBy('year', this.get('clock.date').getFullYear());
  }),

  currentRenewIsOpen: computed('currentYear.@each', 'clock.date', function() {
    return this.get('currentYear.renew_opening_time') &&
           this.get('clock.date') > new Date(this.get('currentYear.renew_opening_time'));
  }),

  currentRenewIsOpenAndNeeded: computed('currentRenewIsOpen', 'myMemberships.@each', function() {
    return this.currentRenewIsOpen &&
           !this.myMemberships.any((item) => (item.get('reference_year_id') == this.get('currentYear.id')));
  }),

  nextYear: computed('model.years.@each', 'clock.date', function() {
    return this.get('model.years').findBy('year', this.get('clock.date').getFullYear() + 1);
  }),

  nextRenewIsOpen: computed('nextYear.@each', 'clock.date', function() {
    return this.get('nextYear.renew_opening_time') &&
           this.get('clock.date') > new Date(this.get('nextYear.renew_opening_time'));
  }),

  nextRenewIsOpenAndNeeded: computed('nextRenewIsOpen', 'myMemberships.@each', function() {
    return this.nextRenewIsOpen &&
           !this.myMemberships.any((item) => (item.get('reference_year_id') == this.get('nextYear.id')));
  }),

  nextRenewIsGoingToOpen: computed('nextYear.@each', 'clock.time', function() {
    return this.get('nextYear.renew_announce_time') &&
           this.get('nextYear.renew_opening_time') &&
           this.get('clock.time') > new Date(this.get('nextYear.renew_announce_time')) &&
           this.get('clock.time') < new Date(this.get('nextYear.renew_opening_time'));
  }),

  // ------------------- Roster ---------------------
  rosterCurStatus: alias('model.rosterStatus.current'),
  rosterNextStatus: alias('model.rosterStatus.next'),

  sidebarVisible: computed(function() {
    return ($(window).width() >= 768) ? 'visible' : '';
  }),

  sidebarHandler: function() {
    $(window).resize(function() {
      if($(window).width() >= 768) {
        $('#main-sidebar').sidebar('show');
      } else {
       $('#main-sidebar').sidebar('hide');
      }
    }).resize();
  }.on('init'),

  actions: {
    logout() {
      if (confirm("Sicuro di voler uscire?"))
        this.session.logout();
    },

    sidebarToggle(id) {
      $(`#${id}`).sidebar('toggle');
    },

    sidebarClick() {
      if($(window).width() < 768) {
       $('#main-sidebar').sidebar('hide');
      }
    },
  },
});
