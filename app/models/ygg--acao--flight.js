import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  uuid: DS.attr('string'),

  aircraft_reg: DS.attr('string'),
  aircraft_id: DS.attr('number'),
  aircraft_class: DS.attr('string'),

  takeoff_time: DS.attr('date'),
  takeoff_location_raw: DS.attr('string'),
  landing_time: DS.attr('date'),
  landing_location_raw: DS.attr('string'),

  instruction_flight: DS.attr('boolean'),
  launch_type: DS.attr('string'),
  acao_quota: DS.attr('string'),

  pilot1_role: DS.attr('string'),
  pilot2_role: DS.attr('string'),

  aircraft: DS.belongsTo('ygg--acao--aircraft'),
  pilot1: DS.belongsTo('ygg--core--person'),
  pilot2: DS.belongsTo('ygg--core--person'),
  takeoff_airfield: DS.belongsTo('ygg--acao--airfield'),
  landing_airfield: DS.belongsTo('ygg--acao--airfield'),
  //towed_by: DS.belongsTo('ygg--acao--flight'),

  duration: computed('takeoff_time,landing_time', function() { return this.landing_time - this.takeoff_time; }),
});
