import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  person: DS.belongsTo('ygg--core--person'),
  day: DS.belongsTo('ygg--acao--tow-roster-day'),
  notes: DS.attr('string'),
  selected_at: DS.attr('date'),
});
