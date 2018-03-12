import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  cnt: DS.attr('number'),
  amount: DS.attr('number'),
  recorded_at: DS.attr('date'),
  descr: DS.attr('string'),
});
