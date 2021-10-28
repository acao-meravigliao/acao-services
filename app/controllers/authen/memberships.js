import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { assign } from '@ember/polyfills';
import { tracked } from '@glimmer/tracking';

export default class MembershipsController extends Controller {
  @service session;

  @tracked membershipsSortOrder = [ 'reference_year.year:desc' ];

  get memberships() { return this.model.sortBy('membershipsSortOrder'); }

//  loadDataTask: task(function * (args) {
//    let params = {
//      filter: { person_id: this.get('session.personId') },
//      order: { 'reference_year.year': 'DESC' },
//    };
//
//    if (args.paginationData) {
//      assign(params, {
//        offset: args.paginationData.pageStart - 1,
//        limit: args.paginationData.pageSize,
//      });
//    }
//
//    let result = yield this.store.query('ygg--acao--membership', params);
//
//    this.set('totalRows', result.get('meta.total_count'));
//
//    return result;
//  }),
}
