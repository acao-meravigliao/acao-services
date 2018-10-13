import DS from 'ember-data';
//import { mapBy, sum } from '@ember/object/computed';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  person_id: DS.attr('number'),
  identifier: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  address: DS.attr('string'),
  created_at: DS.attr('date'),
  completed_at: DS.attr('date'),
  state: DS.attr('string'),
  notes: DS.attr('string'),
  payment_method: DS.attr('string'),
  total: DS.attr('number'),

  details: DS.hasMany('ygg--acao--invoice--detail'),
  person: DS.belongsTo('ygg--core--person'),
  payments: DS.hasMany('ygg--acao--payment'),
});
