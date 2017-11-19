import DS from 'ember-data';

export default DS.Model.extend({
  wsModelName: 'Ygg::Acao::ServiceType',

  uuid: DS.attr('string'),
  symbol: DS.attr('string'),
  name: DS.attr('string'),
  descr: DS.attr('string'),
  price: DS.attr('number'),
  extra_info: DS.attr('string'),
  notes: DS.attr('string'),
  available_for_shop: DS.attr('boolean'),
  available_for_membership_renewal: DS.attr('boolean'),
});
