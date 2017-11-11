import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  fqda: DS.attr('string'),
  descr: DS.attr('string'),
});
