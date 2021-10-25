import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

import { computed } from '@ember/object';

export default class YggCoreLocationModel extends Model {
  @attr('string') street_address;
  @attr('string') city;
  @attr('string') state;
  @attr('string') country_code;
  @attr('string') zip;
  @attr('string') provider;
  @attr('string') location_type;
  @attr('string') region;
  @attr('number') accuracy;
  @attr('number') lat;
  @attr('number') lng;
  @attr('number') alt;

  full_address: computed('street_address', 'city', 'zip', function() {
    return [ this.street_address, this.city, this.zip ].filter((x) => (x)).join(', ');
  }),

  latlng: computed('lat', 'lng', function() {
    return this.lat && this.lng ? [ this.lat, this.lng ] : null;
  }),
}
