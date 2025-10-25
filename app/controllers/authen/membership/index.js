import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipIndexController extends Controller {
  @service session;

  @tracked memberships_sort_order = [ 'reference_year.year' ];

  get memberships() {
    return this.model.get_first('ygg--acao--membership');
  }

  get sorted_models() {
    return this.model.sort((a,b) => (a[this.memberships_sort_order] - b[this.memberships_sort_order]));
  }
}
