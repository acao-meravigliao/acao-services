import Route from '@ember/routing/route';
import { service } from '@ember/service';
import * as moment from 'moment';

export default class ApplicationRoute extends Route {
  @service session;
  @service intl;
  @service versionChecker;

  beforeModel(transition) {
    moment.locale('it');

    this.intl.setLocale([ 'it-it' ]);

    //this.versionChecker;
  }

  model() {
    if (!this.get('session.isLoaded'))
      return this.session.load();
  }
//
//  actions: {
////    loading(error, transition) {
////      return true;
////    },
////     error(error, transition) {
////      return true;
////    },
//  },
}
