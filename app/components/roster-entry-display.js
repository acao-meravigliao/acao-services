import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',

  ajax: service(),

  actions: {
    onPopupShow(value, popup) {
      this.set('value', new Date());
      this.set('currentPopup', popup);
    },
    doExchange() {
      //this.set('entry.on_offer_since', new Date());
      this.get('ajax').request('/ygg/acao/roster_entries/' + this.get('entry').get('id').toString() + '/offer', {
        method: 'POST',
        data: {},
      });

      this.get('currentPopup').hide();
    },
    doCancelExchange() {
      //this.set('entry.on_offer_since', new Date());
      this.get('ajax').request('/ygg/acao/roster_entries/' + this.get('entry').get('id').toString() + '/offer_cancel', {
        method: 'POST',
        data: {},
      });

      this.get('currentPopup').hide();
    },
    cancel(){
      this.get('currentPopup').hide();
    },
  },
});
