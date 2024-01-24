import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MembershipsController extends Controller {
  @service session;

  @tracked membershipsSortOrder = [ 'reference_year.year:desc' ];

  get sorted_models() { return this.model.sortBy('membershipsSortOrder'); }
}
