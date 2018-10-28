import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  person_id: DS.attr('number'),
  email_allowed: DS.attr('boolean'),
  tug_pilot: DS.attr('boolean'),
  board_member: DS.attr('boolean'),
  instructor: DS.attr('boolean'),
  possible_roster_chief: DS.attr('boolean'),
  fireman: DS.attr('boolean'),
  valid_from: DS.attr('date'),
  valid_to: DS.attr('date'),
  reference_year_id: DS.attr('number'),
  invoice_detail_id: DS.attr('string'),
  status: DS.attr('string'),

  reference_year: DS.belongsTo('ygg--acao--year'),
  invoice_detail: DS.belongsTo('ygg--acao--invoice--detail'),
  person: DS.belongsTo('ygg--core--person'),
});
