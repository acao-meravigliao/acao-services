import Controller from '@ember/controller';
import { service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipRenewRosterController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard;

  get context() { return this.wizard.context; }
  get state() { return this.wizard.state; }


  @action submit() {
    var me = this;

//    this.state.services = this.services.filter((x) => (x.type));
//
//console.log("COMMMMMMMMMMMMMMMMMM", this.getProperties( 'enable_cav', 'enable_email', 'accept_rules', 'payment_method'));
//
//    this.state.setProperties(this.getProperties(
//      'enable_cav', 'enable_email', 'accept_rules', 'payment_method',
//    ));

    this.router.transitionTo('authen.membership.renew.summary');
  }
}
