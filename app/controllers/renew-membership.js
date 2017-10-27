import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  currentPath: Ember.computed.alias('applicationController.currentPath'),
  currentStep: Ember.computed('currentPath', function() {
    
  }),
});
