import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash } from 'rsvp';

export default class AuthenRenewMembershipDataRoute extends Route {
  model() {
    return hash({
    });
  }

//  setupController(controller, model) {
//    super.setupController(...arguments);
//
//console.log("EEDDDDDDDDDDDEEEEEEEEEE", this.modelFor('authen.membership.renew'));
//
//    controller.services = this.modelFor('authen.membership.renew').state.services;
//  }
}
