import Controller from '@ember/controller';
import { service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenRenewMembershipRosterController extends Controller {
  @service session;
  @controller('authen.renew-membership') wizard;

  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }


  @action commit() {
    var me = this;

//    this.state.services = this.services.filter((x) => (x.type));
//
//console.log("COMMMMMMMMMMMMMMMMMM", this.getProperties( 'enableCav', 'enableEmail', 'acceptRules', 'paymentMethod'));
//
//    this.state.setProperties(this.getProperties(
//      'enableCav', 'enableEmail', 'acceptRules', 'paymentMethod',
//    ));

    this.transitionToRoute('authen.renew-membership.summary');
  }
}
