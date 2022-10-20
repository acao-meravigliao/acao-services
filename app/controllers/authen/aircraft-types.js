import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import { service } from '@ember/service';
//import Table from 'ember-light-table';
import { A } from '@ember/array';

import moment from 'moment';
import numeral from 'numeral';

export default class AuthenAircraftTypesController extends Controller {
  @service session;
  @service store;

  get columns() {
    return [
     {
      label: 'Nome',
      valuePath: 'name',
      width: '250px',
     },
     {
      label: 'Produttore',
      valuePath: 'manufacturer',
      width: '200px',
     },
     {
      label: 'Posti',
      valuePath: 'seats',
      width: '80px',
     },
     {
      label: 'Motore',
      valuePath: 'motor',
      width: '80px',
     },
     {
      label: 'Handicap',
      valuePath: 'handicap',
      width: '150px',
      format: function(value) { return value ? numeral(value).format('0.00') : ''; },
     },
     {
      label: 'Handicap Club',
      valuePath: 'handicap_club',
      width: '150px',
      format: function(value) { return value ? numeral(value).format('0.00') : ''; },
     },
    ];
  }

  offset = 0;
  limit = 50;
  sort = 'name';
  dir = 'asc';

//  isLoading: oneWay('fetchRecords.isRunning'),
//  canLoadMore: true,
//  enableSync: true,
//
//  model: A(),
//  meta: null,
//  table: null,













//  init() {
//    this._super(...arguments);
//
//    let table = new Table(this.columns, this.model, { enableSync: this.enableSync });
//    let sortColumn = table.get('allColumns').findBy('valuePath', this.sort);
//
//    // Setup initial sort column
//    if (sortColumn) {
//      sortColumn.set('sorted', true);
//    }
//
//    this.set('table', table);
//  },
//
//  fetchRecords: task(function*() {
//    let order = {};
//    order[this.sort] = this.dir;
//
//    let records = yield this.store.query('ygg--acao--aircraft-type', {
//      offset: this.offset,
//      limit: this.limit,
//      order: order,
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
}
