import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  recorded_at: DS.attr('date'),
  descr: DS.attr('string'),
  amount: DS.attr('number'),
  prev_credit: DS.attr('number'),
  credit: DS.attr('number'),
});
