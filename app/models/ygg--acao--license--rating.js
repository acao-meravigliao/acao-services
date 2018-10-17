import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  type: DS.attr('string'),
  issued_at: DS.attr('date'),
  valid_to: DS.attr('date'),

  license: DS.belongsTo('ygg--acao--license'),
});
