import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { username, password } = this.getProperties('username', 'password');

      if (username.indexOf('@') == -1)
        username = username + '@cp.acao.it';

      this.get('session').authenticate('authenticator:yggdra', username, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
