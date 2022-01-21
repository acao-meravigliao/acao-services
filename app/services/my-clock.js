import Service, { service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { run } from '@ember/runloop';

export default Service.extend({
  interval: 5000,

  time: null,
  date: computed('time', function() {
    return new Date(this.time);
  }),

  init() {
    this._super(...arguments);
    this.start();
  },

  start() {
    this.update();
    this.set('intervalId', window.setInterval(() => this.update(), this.interval));
  },

  stop() {
    window.clearInterval(this.intervalId);
  },

  willDestroy() {
    this._super(...arguments);
    this.stop();
  },

  onIntervalChange: observer('interval', function() {
    this.stop();
    this.start();
  }),

  update() {
    run(() => this.set('time', Date.now()));
  }
});

