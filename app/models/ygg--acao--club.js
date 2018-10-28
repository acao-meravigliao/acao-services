import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  airfield_id: DS.attr('number'),

  airfield: DS.belongsTo('ygg--acao--airfield'),
});
