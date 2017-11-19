import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  count: DS.attr('number'),
  service: DS.belongsTo('ygg--acao--service-type'),
});
