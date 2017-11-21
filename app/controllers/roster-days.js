import Ember from 'ember';

export default Ember.Controller.extend({
  prevYear: Ember.computed('currentYear', function() { return this.get('currentYear') - 1; }),
  nextYear: Ember.computed('currentYear', function() { return this.get('currentYear') + 1; }),
});
