import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  name: DS.attr('string'),
  icao_code: DS.attr('string'),
  symbol: DS.attr('string'),

  location: DS.belongsTo('ygg--core--location'),
});
