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
      label: 'Marche',
      valuePath: 'registration',
      width: '160px',
     },
     {
      label: 'Sigle Gara',
      valuePath: 'race_registration',
      width: '120px',
     },
     {
      label: 'Proprietario',
      valuePath: 'owner.last_name',
      width: '200px',
     },
     {
      label: 'ID Flarm',
      valuePath: 'flarm_identifier',
     },
     {
      label: 'ID ICAO',
      valuePath: 'icao_identifier',
     },
    ];
  }),

  store: service(),

  offset: 0,
  limit: 50,
  sort: 'registration',
  dir: 'asc',

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

    let records = yield this.store.query('ygg--acao--aircraft', {
      offset: this.offset,
      limit: this.limit,
      order: order,
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
