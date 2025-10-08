import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAircraftModel extends Model {
  @attr('string') registration;
  @attr('string') race_registration;
  @attr('string') flarm_identifier;
  @attr('string') icao_identifier;
  @attr('string') serial_number;
  @attr('boolean') hangar;
  @attr('date') arc_valid_to;
  @attr('date') insurance_valid_to;

  @vosHasMany('aircraft', 'aircraft_owner') owners;
  @vosBelongsTo('aircraft', 'club') club;
  @vosBelongsTo('aircraft', 'club_owner') club_owner;
  @vosBelongsTo('aircraft', 'aircraft_type') aircraft_type;
  @vosHasMany('aircraft', 'flarmnet_entry') flarmnet_entries;
  @vosHasMany('aircraft', 'ogn_ddb_entry') ogn_ddb_entries;

  is_owned_by(member) {
    return this.owners.some((x) => (x.member === member));
  }
}
