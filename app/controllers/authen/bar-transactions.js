import Controller from '@ember/controller';
import { service } from '@ember/service';
//import { task } from 'ember-concurrency';
//import { assign } from '@ember/polyfills';

export default class BarTransactionController extends Controller {
  @service session;

////  loadDataTask: task(function * (args) {
////    let params = {
////      filter: { person_id: this.get('session.personId') },
////      order: { 'recorded_at': 'DESC' },
////    };
////
////    if (args.paginationData) {
////      assign(params, {
////        offset: args.paginationData.pageStart - 1,
////        limit: args.paginationData.pageSize,
////      });
////    }
////
////    let result = yield this.store.query('ygg--acao--bar-transaction', params);
////
////    this.set('totalRows', result.get('meta.total_count'));
////
////    return result;
////  }),
}
