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

  @vosBelongsTo('aircraft', 'owner') owner;
  @vosBelongsTo('aircraft', 'club') club;
  @vosBelongsTo('aircraft', 'aircraft_type') aircraft_type;
}
