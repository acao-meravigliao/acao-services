import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  wizard: controller('logged-in.renew-membership'),
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
      this.ajax.post('/ygg/acao/memberships/renew', {
        contentType: 'application/json',
        data: req,
      }).then((response) => {
        me.set('submitting', false);
        me.transitionToRoute('logged-in.payment', response.payment_id);
      }).catch((error) => {
        me.set('submitting', false);

        if (error.payload && typeof(error.payload) == 'object') {
          me.set('submitError', error.payload.title + ': ' + error.payload.descr);
        } else {
          me.set('submitError', error.payload);
        }
      });
    },
  },
});
