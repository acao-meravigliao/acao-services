import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { later, cancel } from '@ember/runloop';
import { A } from '@ember/array';

export default class ToasterService extends Service {
  @tracked toasts = A();

  constructor() {
    super();

    //this.report("Test 123", 'danger', { detail: '456', timeout: 5000 });
  }

  report(message, level = 'info', opts = {}) {
    let toast = Object.assign({ message: message, level: level }, opts);

    this.toasts.pushObject(toast);

    let timeout = opts.timeout || 7000;
    if (timeout) {
      toast.timer = later(this, this.on_timeout, toast, timeout);
    }
  }

  on_timeout(toast) {
    this.close(toast);
  }

  close(toast) {
    if (toast.timer)
      cancel(toast.timer);

    this.toasts.removeObject(toast);
  }

  clear() {
    this.toasts.clear();
  }
}
