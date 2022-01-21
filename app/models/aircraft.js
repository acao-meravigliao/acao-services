import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

export default class AircarftModel extends Model {
  @attr('date') created_at;
  @attr('date') updated_at;
  @attr('string') race_registration;
  @attr('string') registration;
  @attr('string') flarm_identifier;
  @attr('string') icao_identifier;
  @attr('string') fn_owner_name;
  @attr('string') fn_home_airport;
  @attr('string') fn_type_name;
  @attr('string') fn_common_radio_frequency;

  @attr('number') lat;
  @attr('number') lng;
  @attr('number') cog;
  @attr('number') sog;

  get latlng() {
    return [ this.lat, this.lng ];
  }
}
