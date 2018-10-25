import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { assign } from '@ember/polyfills';

export default Controller.extend({
  session: service(),

  loadDataTask: task(function * (args) {
    let params = {
      filter: { owner_id: this.get('session.personId') },
      order: { 'created_at': 'DESC' },
    };

    if (args.paginationData) {
      assign(params, {
        offset: args.paginationData.pageStart - 1,
        limit: args.paginationData.pageSize,
      });
    }

    let result = yield this.store.query('ygg--acao--aircraft', params);

    this.set('totalRows', result.get('meta.total_count'));

    return result;
  }),
});

