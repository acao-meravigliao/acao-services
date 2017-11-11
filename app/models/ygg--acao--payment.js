import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  code: DS.attr('string'),
  created_at: DS.attr('date'),
  state: DS.attr('string'),
  person: DS.belongsTo('ygg--core--person'),
  payment_method: DS.attr('string'),
  services: DS.hasMany('ygg--acao--payment--service'),

  amounts: Ember.computed.mapBy('services', 'price'),
  total: Ember.computed.sum('amounts'),
});
