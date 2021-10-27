import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service versionChecker;

  beforeModel(transition) {
    //this.moment.setLocale('it');
    this.versionChecker;
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
