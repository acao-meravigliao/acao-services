import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { service } from '@ember/service';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';

export default class AuthenPaymentsController extends Controller {
  @service session;

  stateColors = {
    'PENDING': 'orange',
    'COMPLETED': 'green',
  };

  get sorted_models() {
    return this.model.sortBy('created_at');
  }

//  allModels: computed(function() { return this.store.peekAll(this.model); }),
//  creationObserver: observer('allModels.length', function() {
//    console.log("CREATION  OBSERVER");
//  }),

////  loadDataTask: task(function * (args) {
////    let params = {
////      filter: { person_id: this.get('session.person_id') },
////      order: { 'created_at': 'DESC' },
////    };
////
////    if (args.paginationData) {
////      assign(params, {
////        offset: args.paginationData.pageStart - 1,
////        limit: args.paginationData.pageSize,
////      });
////    }
////
////    let result = yield this.store.query('ygg--acao--payment', params);
////
////    this.set('totalRows', result.get('meta.total_count'));
////
////    return result;
////  }),
}
