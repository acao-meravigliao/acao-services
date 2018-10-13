import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
  session: service('session'),
  clock: service('my-clock'),
  context: alias('model.context.current'),
  person: alias('session.person'),
  serviceTypes: alias('model.serviceTypes'),
  state: alias('model.state'),

  renewIsOpen: computed('context.opening_time', 'clock.time', function() {
    return this.get('clock.date') > new Date(this.get('context.opening_time'));
  }),

});
