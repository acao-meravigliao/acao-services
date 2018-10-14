import { oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import InfiniteArray from 'acao-services/utils/infinite-array';
//import { debounce } from '@ember/runloop';

//import moment from 'moment';
//import numeral from 'numeral';

export default Controller.extend({
//  moment: service(),
  session: service(),
  columns: A([
     {
      name: 'Aeromobile',
      valuePath: 'aircraft.registration',
      width: 160,
      sortable: false,
     },
     {
      name: 'Decollo',
      valuePath: 'takeoff_time',
      width: 160,
      cellComponent: 'date-column',
     },
     {
      name: 'Atterraggio',
      valuePath: 'takeoff_time',
      width: 160,
      cellComponent: 'date-column',
     },
     {
      name: 'Durata',
      width: 80,
      valuePath: 'duration',
      sortable: false,
      cellComponent: 'duration-column',
     },
//     {
//      name: 'Pilota',
//      width: 160,
//      valuePath: 'pilot1.last_name',
//     },
//     {
//      name: 'Passeggero',
//      width: 160,
//      valuePath: 'pilot2.last_name',
//     },
     {
      name: 'Apt Decollo',
      width: 160,
      valuePath: 'takeoff_airfield.icao_code',
      sortable: false,
     },
     {
      name: 'Apt Atterr.',
      width: 160,
      valuePath: 'landing_airfield.icao_code',
      sortable: false,
     },
     {
      name: 'Lancio',
      width: 100,
      valuePath: 'launch_type',
     },
     {
      name: 'Quota',
      width: 80,
      valuePath: 'acao_quota',
     },
  ]),

  porcodio: InfiniteArray.create(),

  offset: 0,
  limit: 50,
  dir: 'desc',
  sort: 'takeoff_time',

  isLoading: oneWay('fetchRecords.isRunning'),
  canLoadMore: true,

  init() {
    this._super(...arguments);

//    let table = new Table(this.get('columns'), this.get('model'), { enableSync: this.get('enableSync') });
//    let sortColumn = table.get('allColumns').findBy('valuePath', this.get('sort'));
//
//    // Setup initial sort column
//    if (sortColumn) {
//      sortColumn.set('sorted', true);
//    }
//
//    this.set('table', table);
  },

//  fetchRecords: task(function*() {
//    let order = {};
//    order[this.get('sort')] = this.get('dir');
//
//    let filter = { pilot1_id: this.get('session.personId') };
//
//    if (this.get('aircraftReg'))
//      filter['aircraft.registration'] = this.get('aircraftReg');
//
//    let records = yield this.get('store').query('ygg--acao--flight', {
//      offset: this.get('offset'),
//      limit: this.get('limit'),
//      order: order,
//      filter: filter,
//    });
//
//    this.get('model').pushObjects(records.toArray());
//    this.set('meta', records.get('meta'));
//    this.set('canLoadMore', !isEmpty(records));
//  }).restartable(),

  aircraftRegObserver: observer('aircraftReg', function() {
//    debounce(this, 'aicraftRegChanged', 500);
  }),

  aicraftRegChanged() {
console.log("AIRCRAFT_REG CHANGED");
//    this.setProperties({
//      canLoadMore: true,
//      offset: 0
//    });
//    this.get('model').clear();
  },

  actions: {
//    onScrolledToBottom() {
//      if (this.get('canLoadMore')) {
//        this.incrementProperty('offset', this.get('limit'));
//        this.get('fetchRecords').perform();
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
//        this.get('model').clear();
//        this.fetchRecords();
//      }
//    },
  }
});
