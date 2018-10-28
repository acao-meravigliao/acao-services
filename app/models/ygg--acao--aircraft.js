import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  registration: DS.attr('string'),
  race_registration: DS.attr('string'),
  flarm_identifier: DS.attr('string'),
  icao_identifier: DS.attr('string'),
  serial_number: DS.attr('string'),
  hangar: DS.attr('boolean'),
  arc_valid_to: DS.attr('date'),
  insurance_valid_to: DS.attr('date'),

  aircraft_type: DS.belongsTo('ygg--acao--aircraft-type'),
  club: DS.belongsTo('ygg--acao--club'),
  owner: DS.belongsTo('ygg--core--person'),
});
