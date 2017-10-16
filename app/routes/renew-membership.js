import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  mainTitle: 'Rinnovo iscrizione',

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('loading', true);

    Ember.$.ajax({
      type: 'GET',
      url: '/ygg/acao/renew_membership/context',
      dataType: 'json',
    }).then(function(response) {
      controller.set('membershipAmount', response.membershipAmount);
      controller.set('cavAmount', response.cavAmount);
      controller.set('cavType', response.cavType);
      controller.set('availableServices', response.availableServices);
      controller.set('loading', false);
    }, function(xhr, status, error) {
      controller.set('loading', false);
      controller.set('loadingFailure', true);
    });

  }

}, AuthenticatedRouteMixin);
