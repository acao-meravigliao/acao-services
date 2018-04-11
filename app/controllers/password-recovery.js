import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ajax: service(),

  actions: {
    recover() {
      let me = this;

      let req = {
        acao_code: this.get('username'),
      };

      this.set('success', false);
      this.set('exception', null);
      this.set('submitting', true);

      this.get('ajax').request('/ygg/acao/password_recovery', {
        method: 'POST',
        data: JSON.stringify(req),
//        dataType: 'json',
        contentType: 'application/json',
      }).then(function(response) {
        me.set('submitting', false);
        me.set('success', true);
      }, function(xhr, status, error) {
        me.set('submitting', false);

        if (xhr.responseJSON)
          me.set('exception', xhr.responseJSON);
        else {
          me.set('exception', {
            title: 'Request error',
            descr: xhr.responseText,
          });
        }
      });
    }
  }
});
