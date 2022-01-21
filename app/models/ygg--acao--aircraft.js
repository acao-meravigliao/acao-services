import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoAircraftModel extends Model {
  @attr('string') registration;
  @attr('string') race_registration;
  @attr('string') flarm_identifier;
  @attr('string') icao_identifier;
  @attr('string') serial_number;
  @attr('boolean') hangar;
  @attr('date') arc_valid_to;
  @attr('date') insurance_valid_to;

  @belongsTo('ygg--acao--aircraft-type') aircraft_type;
  @belongsTo('ygg--acao--club') club;
  @belongsTo('ygg--core--person') owner;
}
