import DS from 'ember-data';

export default DS.Model.extend({
  wsModelName: 'Ygg::Acao::ServiceType',

  uuid: DS.attr('string'),
  symbol: DS.attr('string'),
  name: DS.attr('string'),
  price: DS.attr('number'),
  publish: DS.attr('boolean'),
  extra_info: DS.attr('string'),
  notes: DS.attr('string'),
});
