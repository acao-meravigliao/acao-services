import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ajax: service(),

  assService: computed('model.serviceTypes', 'context.ass_type', function() {
    return this.get('model.serviceTypes').findBy('symbol', this.get('context.ass_type'));
  }),

  cavService: computed('model.serviceTypes', 'context.cav_type', 'enableCav', function() {
    return this.enableCav ? this.get('model.serviceTypes').findBy('symbol', this.get('context.cav_type')) : null;
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
