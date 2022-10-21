import Service from '@ember/service';
import { run } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class ClockService extends Service {
  @tracked time;

  interval = 1000;
  set interval(val) {
    this.interval = val;
    this.stop();
    this.start();
  }

  get date() {
    return new Date(this.time);
  }

  constructor() {
    super(...arguments);
    this.start();
  }

  start() {
    this.update();
    this.interval_id = window.setInterval(() => { this.update() }, this.interval);
  }

  stop() {
    window.clearInterval(this.interval_id);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.stop();
  }

  update() {
    run(() => { this.time = new Date() });
  }
}
