import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  uuid: DS.attr('string'),
  race_registration: DS.attr('string'),
  registration: DS.attr('string'),
  flarm_identifier: DS.attr('string'),
  icao_identifier: DS.attr('string'),
  fn_owner_name: DS.attr('string'),
  fn_home_airport: DS.attr('string'),
  fn_type_name: DS.attr('string'),
  fn_common_radio_frequency: DS.attr('string'),

  lat: DS.attr('number'),
  lng: DS.attr('number'),
  cog: DS.attr('number'),
  sog: DS.attr('number'),

  latlng: computed('lat', 'lng', function() {
    return [ this.lat, this.lng ];
  }),
});
