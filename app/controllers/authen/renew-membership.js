import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
  session: service('session'),
  clock: service('my-clock'),
  context: alias('model.context'),
  person: alias('session.person'),
  serviceTypes: alias('model.serviceTypes'),
  state: alias('model.state'),

  renewIsOpen: computed('context.opening_time', 'clock.time', function() {
    return this.context &&
           this.get('context.opening_time') &&
           this.get('clock.date') > new Date(this.get('context.opening_time'));
  }),

  renewIsOpenAndNeeded: computed('renewIsOpen', 'model.memberships.@each', 'model.storeMemberships.@each', function() {
    return this.renewIsOpen &&
           !this.get('model.memberships').any((item) => (item.get('reference_year_id') == this.get('context.year_id')));
  }),

  renewIsGoingToOpen: computed('model.context.next.@each', 'clock.time', function() {
    return this.get('model.context.next.announce_time') &&
           this.get('model.context.next.opening_time') &&
           this.get('clock.date') > new Date(this.get('model.context.next.announce_time')) &&
           this.get('clock.date') < new Date(this.get('model.context.next.opening_time'));
  }),
});
