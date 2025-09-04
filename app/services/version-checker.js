import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import ENV from '../config/environment';


export default class VersionCheckerService extends Service {
  interval = 60000;
  reload = 'ask';

  @tracked version = null;
  @tracked available_version = null;

  constructor() {
    super(...arguments);

    this.version = ENV.APP.version;
console.log("VERSION=", this.version);

    this.timer_start();
  }

  stop() {
    this.timer.cancel();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.stop();
  }

  timer_start() {
    this.timer = later(this, this.timer_fired, this.interval);
  }

  timer_fired() {
    fetch('/index.json', { cache: false }).then((res) => {
      if (res.ok) {
        let data = res.json();

        if (data.meta) {
          let meta = data.meta.findBy('name', ENV.APP.name + '/config/environment');
          if (meta) {
            this.available_version = JSON.parse(decodeURIComponent(meta.content)).APP.version;

            if (this.available_version &&
                this.available_version != this.version)
              this.version_mismatch();
          }
        }
      }

      this.timer_start();
    }).catch((res) => {
      this.timer_start();
    });
  }

  version_mismatch() {
    switch(this.reload) {
    case 'yes': window.location.reload(); break;
    case 'ask':
      if (confirm(this.intl.t('version_checker.version_changed_reload')))
        window.location.reload();
      else
        this.reload = 'no';
    break;
    }
  }
}
