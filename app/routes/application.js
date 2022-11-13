import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import * as moment from 'moment';

export default class ApplicationRoute extends Route {
  @service session;
  @service intl;
  @service version_checker;

  constructor() {
    super(...arguments);

    this.intl.setLocale([ 'it-it' ]);

    moment.locale('it');
  }

  beforeModel(transition) {
    this.version_checker;

    if (!this.session.is_loaded)
      return this.session.load();
    else
      return super.beforeModel(...arguments);
  }

//  @action loading(transition) {
//    this.intermediateTransitionTo('initial-connection');
//
////    if (this.vos.state != 'READY') {
////      if (this.initialConnection)
////        this.intermediateTransitionTo('initial-connection');
////      else
////        this.intermediateTransitionTo('offline');
////    } else
////      return true;
//  }

//  @action error(transition) {
//    console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
//    return true;
//  }
}
