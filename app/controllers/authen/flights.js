import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
//import { task } from 'ember-concurrency';
//import { assign } from '@ember/polyfills';

export default class FlightsController extends Controller {
  @service session;

////  loadDataTask: task(function * (args) {
////    let params = {
////      filter: { pilot1_id: this.get('session.personId') },
////      order: { 'takeoff_time': 'DESC' },
////    };
////
////    let partializers;
////
////    if (args.paginationData) {
////      assign(params, {
////        offset: args.paginationData.pageStart - 1,
////        limit: args.paginationData.pageSize,
////      });
////    }
////
////    let result = yield this.store.query('ygg--acao--flight', params);
////
////    this.set('totalRows', result.get('meta.total_count'));
////
////    return result;
////  }),
}
