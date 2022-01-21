import Service, { service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { run } from '@ember/runloop';
import ENV from '../config/environment';

export default Service.extend({
  interval: 60000,
  ajax: service(),

  reload: 'ask',

  version: null,
  availableVersion: null,

  init() {
    this._super(...arguments);

    this.version = ENV.APP.version;
    this.intervalId = window.setInterval(() => this.timer(), this.interval);
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

  timer() {
    this.ajax.request('/index.json', {
      method: 'GET',
      cache: false,
    }).then((res) => {
      if (res.meta) {
        let meta = res.meta.findBy('name', ENV.APP.name + '/config/environment');
        if (meta) {
          this.set('availableVersion', JSON.parse(decodeURIComponent(meta.content)).APP.version);

          if (this.availableVersion &&
              this.availableVersion != this.version)
            this.versionMismatch();
        }
      }

    }).catch((res) => {
    });
  },

  versionMismatch() {
    switch(this.reload) {
    case 'yes': window.location.reload(); break;
    case 'ask':
      if (confirm('Version changed, do you want to reload?'))
        window.location.reload();
      else
        this.set('reload', 'no');
    break;
    }
  },
});

