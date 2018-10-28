import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  person_id: DS.attr('number'),
  aircraft_id: DS.attr('number'),
  recorded_at: DS.attr('date'),
  descr: DS.attr('string'),
  amount: DS.attr('number'),
  prev_credit: DS.attr('number'),
  credit: DS.attr('number'),
  old_operator: DS.attr('string'),
  old_marche_mezzo: DS.attr('string'),

  aircraft: DS.belongsTo('ygg--acao--aircraft'),
});
