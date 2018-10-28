import DS from 'ember-data';

export default DS.Model.extend({
  invoice_id: DS.attr('number'),
  service_type_id: DS.attr('number'),
  price: DS.attr('number'),
  descr: DS.attr('string'),
  count: DS.attr('number'),
  specific_data: DS.attr('string', { key: 'data' }),

  invoice: DS.belongsTo('ygg--acao--invoice'),
  service_type: DS.belongsTo('ygg--acao--service-type'),
});
