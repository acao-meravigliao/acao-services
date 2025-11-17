import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'acao-services/config/environment';

export default class AuthenController extends Controller {
  @service store;
  @service session;
  @service router;
  @service clock;
  @service ms;

  get person() {
    return this.model.get_first('ygg--core--person');
  }

  get member() {
    return this.model.get_first('ygg--acao--member');
  }

  get roles() {
    return this.member.roles.map((x) => (x.symbol));
  }

  get available_roles() {
    return this.model.get_cls('ygg--acao--role');
  }

  get years() {
    return this.model.get_cls('ygg--acao--year');
  }

  get memberships() {
    return this.member.memberships;
  }

  get invoices() {
    return this.member.invoices;
  }

  get roster_status() {
    return this.roster_status;
  }

  get pending_debts() {
    return this.member.debts.filter((x) => (x.state === 'PENDING'));
  }
}
