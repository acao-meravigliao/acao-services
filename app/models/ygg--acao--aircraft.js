import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  registration: DS.attr('string'),
  race_registration: DS.attr('string'),
  flarm_identifier: DS.attr('string'),
  icao_identifier: DS.attr('string'),

  aircraft_type: DS.belongsTo('ygg--core--person'),
  owner: DS.belongsTo('ygg--core--person'),

});
