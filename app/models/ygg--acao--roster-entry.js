import DS from 'ember-data';

export default DS.Model.extend({
  //uuid: DS.attr('string'),
  person: DS.belongsTo('ygg--core--person'),
  roster_day: DS.belongsTo('ygg--acao--roster-day'),
  chief: DS.attr('boolean'),
  notes: DS.attr('string'),
});
