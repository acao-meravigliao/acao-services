import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { formats } from 'acao-services/ember-intl';
import moment from 'moment';
import 'moment/dist/locale/it';

export default class ApplicationRoute extends Route {
  @service vos;
  @service session;
  @service intl;
  @service version_checker;

  initial_connection = true;

  async beforeModel() {
    this.intl.setLocale([ 'it-it' ]);
    this.intl.setFormats(formats);

console.log("AAAAAAAAAAAAAAAAAAA", this.intl);

    moment.locale('it');

    this.vos.on('session_reset', () => {
      this.router.replaceWith(config.authenticated_route);
    });

    this.vos.on('instance_mismatch', () => {
      this.refresh();
    });
  }

  async model() {
    this.version_checker;

    await this.session.load();

    await this.vos.connect();

    await this.session.load_from_vos();

    this.initial_connection = false;
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
