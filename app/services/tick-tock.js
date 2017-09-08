
import Ember from 'ember';

export default Ember.Service.extend({
  clock: 0,

  init() {
    this._super(...arguments);

    this.tick();
  },

  tick() {
    this.set('clock', this.get('clock') + 1);

    Ember.run.later(this, this.tick, 1000);
  },

  reset() {
    this.set('clock', 0);
  },

});
