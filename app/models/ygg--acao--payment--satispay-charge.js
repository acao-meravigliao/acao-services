import DS from 'ember-data';

export default DS.Model.extend({
  payment: DS.belongsTo('ygg--acao--payment'),
});
