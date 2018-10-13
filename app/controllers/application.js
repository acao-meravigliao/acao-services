import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { on } from '@ember/object/evented';
import $ from 'jquery';

export default Controller.extend({
  ws: service('web-socket'),
  session: service('session'),
  cart: service('shopping-cart'),
  clock: service('my-clock'),
  headData: service(),

  // -------- Page title hack  -------------------
  pageTitleList: service(),
  myPageTitle: '',

  titleChangeObserver: on('init', observer('pageTitleList.sortedTokens.@each', function() {
    once(this, function() {
      this.set('myPageTitle', this.get('pageTitleList').toString());
    });
  })),

  // ------------------- Payments ---------------------
  pendingPayments: computed('session.personId', 'model.payments.[]', function() {
    if (this.get('session.isLoaded')) {
      return this.store.query('ygg--acao--payment', { filter: { state: 'PENDING', person_id: this.get('session.personId') } });
    } else
      return [];
  }),

  // ------------------- Renewal ---------------------
  renewalContext: alias('model.renewalContext'),

  renewIsOpen: computed('renewalContext.@each', 'model.memberships.[]', 'clock.time', function() {
    return this.get('renewalContext') &&
           this.get('renewalContext.current.opening_time') &&
           this.get('clock.date') > new Date(this.get('renewalContext.current.opening_time'));
  }),

  renewIsOpenAndNeeded: computed('renewIsOpen', function() {
    return this.get('renewIsOpen') &&
           !this.get('model.memberships').any((item) => (item.get('reference_year_id') == this.get('model.renewalContext.current.year_id')));
  }),

  renewYear: computed('renewIsOpenAndNeeded', 'renewalContext.current.renew_for_year', function() {
    return this.get('renewIsOpenAndNeeded') ? this.get('renewalContext.current.year') : null;
  }),

  // ------------------- Roster ---------------------
  rosterEntriesSelectable: alias('model.rosterStatus.can_select_entries'),
  rosterEntriesPresent: alias('model.rosterStatus.needed_entries_present'),

  actions: {
    logout() {
      this.session.logout();
    },

    sidebarToggle(id) {
      $(`#${id}`).sidebar('toggle');
    },
  },
});
