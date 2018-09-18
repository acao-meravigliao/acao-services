import { oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import Table from 'ember-light-table';
import { A } from '@ember/array';

import moment from 'moment';
import numeral from 'numeral';

export default Controller.extend({
  moment: service(),
  session: service(),
  columns: computed(function() {
    return [
     {
      label: 'Data',
      valuePath: 'recorded_at',
      width: '160px',
      format: function(value) { return moment(value).format('MM-DD-YYYY HH:mm:ss'); },
     },
     {
      label: 'Num.',
      valuePath: 'cnt',
      width: '100px',
     },
     {
      label: 'Descrizione',
      valuePath: 'descr',
     },
     {
      label: 'Ammontare',
      valuePath: 'amount',
      width: '150px',
      format: function(value) { return numeral(value).format('0.0'); },
      cellClassNames: 'amount',
     },
    ];
  }),

  store: service(),

  offset: 0,
  limit: 50,
  dir: 'desc',
  sort: 'recorded_at',

  isLoading: oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,

  model: A(),
  meta: null,
  table: null,

  init() {
    this._super(...arguments);

    let table = new Table(this.columns, this.model, { enableSync: this.enableSync });
    let sortColumn = table.get('allColumns').findBy('valuePath', this.sort);

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
  },

  fetchRecords: task(function*() {
    let order = {};
    order[this.sort] = this.dir;

    let records = yield this.store.query('ygg--acao--token-transaction', {
      offset: this.offset,
      limit: this.limit,
      order: order,
      filter: { person_id: this.get('session.personId') }
    });

    this.model.pushObjects(records.toArray());
    this.set('meta', records.get('meta'));
    this.set('canLoadMore', !isEmpty(records));
  }).restartable(),

  actions: {
    onScrolledToBottom() {
      if (this.canLoadMore) {
        this.incrementProperty('offset', this.limit);
        this.fetchRecords.perform();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          canLoadMore: true,
          offset: 0
        });
        this.model.clear();
      }
    }
  }
});
