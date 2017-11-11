import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  street_address: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  country_code: DS.attr('string'),
  zip: DS.attr('string'),
  provider: DS.attr('string'),
  location_type: DS.attr('string'),
  region: DS.attr('string'),
  accuracy: DS.attr('number'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  alt: DS.attr('number'),
});
