import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class InvoicesController extends Controller {
  @service session;

  stateColors = {
    'PENDING': 'orange',
    'COMPLETED': 'green',
  };

  @action async loadData({ paginationData, sortData, filterData }) {
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

    let result = await this.store.query('ygg--acao--invoice', params);

    this.set('totalRows', result.get('meta.total_count'));

    return result;
  }
}
