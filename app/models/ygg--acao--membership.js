import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  year: DS.attr('number'),
  email_allowed: DS.attr('boolean'),
  tug_pilot: DS.attr('boolean'),
  board_member: DS.attr('boolean'),
  instructor: DS.attr('boolean'),
  possible_roster_chief: DS.attr('boolean'),
  fireman: DS.attr('boolean'),

  payment: DS.belongsTo('ygg--acao--payment'),
});
