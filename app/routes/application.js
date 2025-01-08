import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import * as moment from 'moment';

export default class ApplicationRoute extends Route {
  @service vos;
  @service session;
  @service intl;
  @service version_checker;

  constructor() {
    super(...arguments);

    this.intl.setLocale([ 'it-it' ]);

    moment.locale('it');

    this.vos.on('session_reset', () => {
      this.router.replaceWith(config.main_route);
    });

    this.vos.on('instance_mismatch', () => {
      this.refresh();
    });
  }

  beforeModel(transition) {
    this.version_checker;

    if (this.vos.state != 'READY') {
      this.vos.connect().catch(() => {});

      return new Promise((resolve, reject) => {
        this.vos.one('ready', () => {
          this.initialConnection = false;

          if (this.session.is_loaded) {
            resolve();
          } else {
            this.session.load().then(() => { resolve(); });
          }
        });
      });
    } else
      return super.beforeModel(...arguments);
  }

  @action loading(transition) {
    if (this.vos.state != 'READY') {
      if (this.initial_connection)
        this.intermediateTransitionTo('initial-connection');
      else
        this.intermediateTransitionTo('offline');
    } else
      return true;
  }
}
