import Controller from '@ember/controller';

export default Controller.extend({
  stateColors: {
    'PENDING': 'orange',
    'COMPLETED': 'green',
  },
});
