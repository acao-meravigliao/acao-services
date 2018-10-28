import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { assign } from '@ember/polyfills';
import { sort, alias } from '@ember/object/computed';

export default Controller.extend({
  session: service(),

  memberships: sort('model', 'membershipsSortOrder'),
  membershipsSortOrder: [ 'reference_year.year:desc' ],

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
});

