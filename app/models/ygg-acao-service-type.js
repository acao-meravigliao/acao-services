import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  symbol: DS.attr('string'),
  name: DS.attr('string'),
  price: DS.attr('number'),
//  payment_services: DS.hasMany('ygg-acao-payment-service'),
});
