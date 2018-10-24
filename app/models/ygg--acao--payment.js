import { mapBy, sum } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  identifier: DS.attr('string'),
  created_at: DS.attr('date'),
  expires_at: DS.attr('date'),
  completed_at: DS.attr('date'),
  state: DS.attr('string'),
  amount: DS.attr('number'),
  person_id: DS.attr('number'),
  payment_method: DS.attr('string'),
  reason_for_payment: DS.attr('string'),

  person: DS.belongsTo('ygg--core--person'),
  invoice: DS.belongsTo('ygg--acao--invoice'),
});
