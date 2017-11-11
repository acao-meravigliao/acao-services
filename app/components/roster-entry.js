
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    del(entry) {
      this.get('onDelete')(entry);
    },
  },
});
