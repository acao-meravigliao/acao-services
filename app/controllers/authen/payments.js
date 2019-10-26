import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { assign } from '@ember/polyfills';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';

export default Controller.extend({
  session: service(),

  stateColors: {
    'PENDING': 'orange',
    'COMPLETED': 'green',
  },

//  allModels: computed(function() { return this.store.peekAll(this.model); }),
//  creationObserver: observer('allModels.length', function() {
//    console.log("CREATION  OBSERVER");
//  }),

  loadDataTask: task(function * (args) {
    let params = {
      filter: { person_id: this.get('session.personId') },
      order: { 'created_at': 'DESC' },
    };

    if (args.paginationData) {
      assign(params, {
        offset: args.paginationData.pageStart - 1,
        limit: args.paginationData.pageSize,
      });
    }

    let result = yield this.store.query('ygg--acao--payment', params);

    this.set('totalRows', result.get('meta.total_count'));

    return result;
  }),
});

