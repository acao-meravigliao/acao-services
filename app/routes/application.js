import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import moment from 'moment';
import 'moment/dist/locale/it';

export default class ApplicationRoute extends Route {
  @service vos;
  @service session;
  @service intl;
  @service version_checker;

  initial_connection = true;

  constructor() {
    super(...arguments);

    this.intl.setLocale([ 'it-it' ]);
    moment.locale('it');

    this.vos.on('session_reset', () => {
      this.router.replaceWith(config.authenticated_route);
    });

    this.vos.on('instance_mismatch', () => {
      this.refresh();
    });
  }

  beforeModel(transition) {
    this.version_checker;

    return new Promise((resolve, reject) => {
      this.session.load().then(() => {
        if (this.vos.state != 'READY') {
          this.vos.connect().then(() => {
            this.initial_connection = false;
            resolve();
          }).catch(() => { reject(); });
        }
      });
    });
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
