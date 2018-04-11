import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import Table from 'ember-light-table';
import { A } from '@ember/array';
import { debounce } from '@ember/runloop';

import moment from 'moment';
import numeral from 'numeral';

export default Controller.extend({
  moment: service(),
  session: service(),
  columns: computed(function() {
    return [
     {
      label: 'Aeromobile',
      valuePath: 'aircraft.registration',
      width: '160px',
      sortable: false,
     },
     {
      label: 'Decollo',
      valuePath: 'takeoff_time',
      width: '160px',
      format: function(value) { return moment(value).format('MM-DD-YYYY HH:mm:ss'); },
     },
     {
      label: 'Atterraggio',
      valuePath: 'takeoff_time',
      width: '160px',
      format: function(value) { return moment(value).format('MM-DD-YYYY HH:mm:ss'); },
     },
     {
      label: 'Durata',
      width: '80px',
      valuePath: 'duration',
      sortable: false,
      format: function(value) { return moment(value).format('HH:mm'); },
     },
//     {
//      label: 'Pilota',
//      width: '160px',
//      valuePath: 'pilot1.last_name',
//     },
//     {
//      label: 'Passeggero',
//      width: '160px',
//      valuePath: 'pilot2.last_name',
//     },
     {
      label: 'Apt Decollo',
      width: '160px',
      valuePath: 'takeoff_airfield.icao_code',
      sortable: false,
     },
     {
      label: 'Apt Atterr.',
      width: '160px',
      valuePath: 'landing_airfield.icao_code',
      sortable: false,
     },
     {
      label: 'Lancio',
      width: '100px',
      valuePath: 'launch_type',
     },
     {
      label: 'Quota',
      width: '80px',
      valuePath: 'acao_quota',
     },
    ];
  }),

  store: service(),

  offset: 0,
  limit: 50,
  dir: 'desc',
  sort: 'takeoff_time',

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

    let filter = { pilot1_id: this.get('session.personId') };

    if (this.get('aircraftReg'))
      filter['aircraft.registration'] = this.get('aircraftReg');

    let records = yield this.get('store').query('ygg--acao--flight', {
      offset: this.get('offset'),
      limit: this.get('limit'),
      order: order,
      filter: filter,
    });

    this.get('model').pushObjects(records.toArray());
    this.set('meta', records.get('meta'));
    this.set('canLoadMore', !isEmpty(records));
  }).restartable(),

  aircraftRegObserver: observer('aircraftReg', function() {
    debounce(this, 'aicraftRegChanged', 500);
  }),

  aicraftRegChanged() {
console.log("AIRCRAFT_REG CHANGED");
    this.setProperties({
      canLoadMore: true,
      offset: 0
    });
    this.get('model').clear();
  },

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
        this.fetchRecords();
      }
    },
  }
});
