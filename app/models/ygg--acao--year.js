import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  year: DS.attr('number'),
  renew_opening_time: DS.attr('date'),
  renew_announce_time: DS.attr('date'),
});
