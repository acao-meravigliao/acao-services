import Component from '@ember/component';
import { service } from '@ember/service';

export default Component.extend({
  tagName: '',

  ajax: service(),

  actions: {
    doExchange() {
      this.ajax.request('/ygg/acao/roster_entries/' + this.entry.get('id').toString() + '/offer', {
        method: 'POST',
        data: {},
      });
    },
    doCancelExchange() {
      this.ajax.request('/ygg/acao/roster_entries/' + this.entry.get('id').toString() + '/offer_cancel', {
        method: 'POST',
        data: {},
      });
    },
  },
});
