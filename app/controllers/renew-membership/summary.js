import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  wizard: controller('renew-membership'),
  context: alias('wizard.context'),
  state: alias('wizard.state'),

  ajax: service(),

  assService: computed('wizard.serviceTypes', 'context.ass_type', function() {
    return this.get('wizard.serviceTypes').findBy('symbol', this.get('context.ass_type'));
  }),

  cavService: computed('wizard.serviceTypes', 'context.cav_type', 'enableCav', function() {
    return this.enableCav ? this.get('wizard.serviceTypes').findBy('symbol', this.get('context.cav_type')) : null;
  }),

  total: computed('context.{membershipAmount,cavAmount}', 'assService.@each', 'cavService.@each', 'services.@each', function() {
    return this.get('assService.price') +
           (this.enableCav ? this.get('cavService.price') : 0) +
           this.services.reduce(function(previous, service) {
             return previous + service.get('type.price');
           }, 0);
  }),

  actions: {
    commit() {
      var me = this;

      let req = {
        with_cav: this.get('state.enableCav'),
        enable_email: this.get('state.enableEmail'),
        payment_method: this.get('state.paymentMethod'),
        services: this.get('state.services').map(function(service) {
          return {
            type_id: service.get('type.id'),
            extra_info: service.get('extraInfo'),
          };
        }),
      };

      me.set('submitting', true);
      this.ajax.request('/ygg/acao/memberships/renew', {
        method: 'POST',
        data: JSON.stringify(req),
//        dataType: 'json',
        contentType: 'application/json',
      }).then(function(response) {
        me.set('submitting', false);

        me.transitionToRoute('payment', response.payment_id);

      }, function(xhr, status, error) {
        me.set('submitting', false);

        if (xhr.responseJSON) {
          me.set('submitError', xhr.responseJSON.title + ': ' + xhr.responseJSON.descr);
        } else {
          me.set('submitError', xhr.responseText);
        }
      });
    },
  },
});
