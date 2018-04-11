import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  pilot: DS.belongsTo('ygg--core--person'),
  type: DS.attr('string'),
  identifier: DS.attr('string'),
  issued_at: DS.attr('date'),
  valid_to: DS.attr('date'),
  valid_to2: DS.attr('date'),
});
