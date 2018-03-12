import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  takeoff_time: DS.attr('date'),
  landing_time: DS.attr('date'),

  aircraft: DS.belongsTo('ygg--acao--aircraft'),

  duration: computed('takeoff_time,landing_time', function() { return this.get('landing_time') - this.get('takeoff_time'); }),
});
