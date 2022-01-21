import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later, cancel } from '@ember/runloop';

export default class ConnectionWidgetComponent extends Component {
  @service vos;
  @tracked time_to_wait;
  @tracked time_waited;

  constructor() {
    super(...arguments);

    this.vos.on('reconnect_wait', (wait_start, delay) => {
      this.time_to_wait = delay;
      this.time_waited = Date.now() - this.vos.wait_start;

      this.timer_start();
    });

    this.vos.on('reconnect_wait_done', () => {
      this.timer_stop();
    });
  }

  willDestroy() {
    this.timer_stop();
    super.willDestroy(...arguments);
  }

  get state() {
    return this.vos.state;
  }

  timer_start() {
    this.timer = later(this, this.timer_fired, 1000);
  }

  timer_stop() {
    cancel(this.timer);
  }

  timer_fired() {
    if (this.state == 'RECONNECT_WAIT') {
      this.time_waited = Date.now() - this.vos.wait_start;
      this.timer_start();
    } else {
      this.time_waited = 0;
    }
  }

  @action reconnect_now() {
    this.vos.retry_connection_now();
  }
}
