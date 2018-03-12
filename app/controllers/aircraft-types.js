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
  }),

  store: service(),

  offset: 0,
  limit: 50,
  sort: 'name',
  dir: 'asc',

  isLoading: computed.oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,

  model: A(),
  meta: null,
  table: null,

  init() {
    this._super(...arguments);

    let table = new Table(this.get('columns'), this.get('model'), { enableSync: this.get('enableSync') });
    let sortColumn = table.get('allColumns').findBy('valuePath', this.get('sort'));

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
  },

  fetchRecords: task(function*() {
    let order = {};
    order[this.get('sort')] = this.get('dir');

    let records = yield this.get('store').query('ygg--acao--aircraft-type', {
      offset: this.get('offset'),
      limit: this.get('limit'),
      order: order,
    });

    this.get('model').pushObjects(records.toArray());
    this.set('meta', records.get('meta'));
    this.set('canLoadMore', !isEmpty(records));
  }).restartable(),

  actions: {
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        this.incrementProperty('offset', this.get('limit'));
        this.get('fetchRecords').perform();
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
        this.get('model').clear();
      }
    }
  }
});
