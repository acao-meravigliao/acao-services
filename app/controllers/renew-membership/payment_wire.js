import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  total: Ember.computed('membershipAmount', 'cavAmount', 'enableCav', 'currentServices.@each.type', function() {
    var me = this;

    return this.get('membershipAmount') +
           (this.get('enableCav') ? this.get('cavAmount') : 0) +
           this.get('currentServices').reduce(function(previous, service) {
             return service.type ? (previous + me.get('availableServices')[service.type].price) : previous;
           }, 0);
  }),

  formInvalid: Ember.computed('acceptRules', 'paymentMethod', function() {
    return !this.get('acceptRules')  || !this.get('paymentMethod');
  }),

  renewForYear: (new Date()).getFullYear() + 1,

  currentServices: Ember.A([]),

  actions: {
    addService() {
      this.get('currentServices').addObject(Ember.Object.create({ type: null }));
    },

    removeService(index) {
      this.get('currentServices').removeAt(index);
    },

    setService(index, value) {
      this.get('currentServices')[index].set('type', value);
    },

    setServiceExtraInfo(index, value) {
      this.get('currentServices')[index].set('extraInfo', value);
    },

    commit() {
      //this.get('wizard.state').set('pippo', 123);

      this.transitionToRoute('renew-membership.' + this.get('paymentMethod'));
    },
  },
});
