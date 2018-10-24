import DS from 'ember-data';

export default DS.Model.extend({
  price: DS.attr('number'),
  extra_info: DS.attr('string'),

  invoice: DS.belongsTo('ygg--acao--invoice'),
  service_type: DS.belongsTo('ygg--acao--service-type'),
});
