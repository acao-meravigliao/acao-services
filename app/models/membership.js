import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  year: DS.attr('number'),
});
