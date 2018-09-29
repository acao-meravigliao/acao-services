//import { oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
//import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import Semantic from 'acao-services/themes/semantic';

//import moment from 'moment';
import numeral from 'numeral';

export default Controller.extend({
  store: service(),
  //moment: service(),
  //session: service(),
  columns: computed(function() {
    return [
     {
      title: 'Data',
      propertyName: 'recorded_at',
      component: 'columnDate',
     },
     {
      title: 'Descrizione',
      propertyName: 'descr',
     },
     {
      title: 'Ammontare',
      propertyName: 'amount',
     },
    ];
  }),

  themeInstance: Semantic,


  offset: 0,
  limit: 50,
  dir: 'desc',
  sort: 'recorded_at',

//  isLoading: oneWay('fetchRecords.isRunning'),
//  canLoadMore: true,
//  enableSync: true,

//  model: A(),
//  meta: null,
//  table: null,

//  init() {
//    this._super(...arguments);
//  },
//
//  fetchRecords: task(function*() {
//    let order = {};
//    order[this.sort] = this.dir;
//
//    let records = yield this.store.query('ygg--acao--token-transaction', {
//      offset: this.offset,
//      limit: this.limit,
//      order: order,
//      filter: { person_id: this.get('session.personId') }
//    });
//
//    this.model.pushObjects(records.toArray());
//    this.set('meta', records.get('meta'));
//    this.set('canLoadMore', !isEmpty(records));
//  }).restartable(),
//
//  actions: {
//    onScrolledToBottom() {
//      if (this.canLoadMore) {
//        this.incrementProperty('offset', this.limit);
//        this.fetchRecords.perform();
//      }
//    },
//
//    onColumnClick(column) {
//      if (column.sorted) {
//        this.setProperties({
//          dir: column.ascending ? 'asc' : 'desc',
//          sort: column.get('valuePath'),
//          canLoadMore: true,
//          offset: 0
//        });
//        this.model.clear();
//      }
//    }
//  }
});
