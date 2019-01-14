import DS from 'ember-data';

export default DS.Model.extend({
  //uuid: DS.attr('string'),
  notes: DS.attr('string'),
  selected_at: DS.attr('date', { readOnly: true }),
  on_offer_since: DS.attr('date', { readOnly: true }),

  person: DS.belongsTo('ygg--core--person', { readOnly: true }),
  roster_day: DS.belongsTo('ygg--acao--roster-day'),
});
