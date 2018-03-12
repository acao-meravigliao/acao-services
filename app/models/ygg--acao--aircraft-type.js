import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  manufacturer: DS.attr('string'),
  name: DS.attr('string'),
  seats: DS.attr('number'),
  motor: DS.attr('number'),
  link_wp: DS.attr('string'),
  handicap: DS.attr('number'),
  club_handicap: DS.attr('number'),
  aircraft_class: DS.attr('string'),
});
