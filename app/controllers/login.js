import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),

  actions: {
    authenticate() {
      let { username, password } = this.getProperties('username', 'password');

      if (username.indexOf('@') == -1)
        username = username + '@cp.acao.it';

      this.set('loggingIn', true);

      this.get('session').authenticate('authenticator:yggdra', username, password).then(() => {
        this.set('loggingIn', false);
      }).catch((reason) => {
        this.set('loggingIn', false);

        if (reason.xhr) {
          if (reason.xhr.responseJSON) {
            this.set('errorMessage', reason.xhr.responseJSON.title + ': ' + reason.xhr.responseJSON.descr);
          } else {
            this.set('errorMessage', reason.xhr.responseText);
          }
        } else if (reason.msg) {
          this.set('errorMessage', reason.msg);
        } else {
          this.set('errorMessage', 'Unspecified error');
        }
      });
    }
  }
});
