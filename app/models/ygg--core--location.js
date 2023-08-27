import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

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

  get full_address() {
    return [ this.street_address, this.city, this.zip ].filter((x) => (x)).join(', ');
  }

  get latlng() {
    return this.lat && this.lng ? [ this.lat, this.lng ] : null;
  }
}
