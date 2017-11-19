import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

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
        this.set('errorMessage', reason.msg || JSON.stringify(reason));
      });
    }
  }
});
