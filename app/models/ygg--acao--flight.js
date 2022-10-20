import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoFlightModel extends Model {
  @attr('string') aircraft_reg;
  @attr('string') aircraft_id;
  @attr('string') aircraft_class;

  @attr('date') takeoff_time;
  @attr('string') takeoff_location_raw;
  @attr('date') landing_time;
  @attr('string') landing_location_raw;

  @attr('boolean') instruction_flight;
  @attr('string') launch_type;
  @attr('string') acao_quota;

  @attr('string') pilot1_role;
  @attr('string') pilot2_role;

  @belongsTo('ygg--acao--aircraft', { async: true }) aircraft;
  @belongsTo('ygg--core--person', { async: true }) pilot1;
  @belongsTo('ygg--core--person', { async: true }) pilot2;
  @belongsTo('ygg--acao--airfield', { async: true }) takeoff_airfield;
  @belongsTo('ygg--acao--airfield', { async: true }) landing_airfield;
  @belongsTo('ygg--core--location', { async: true }) takeoff_location;
  @belongsTo('ygg--core--location', { async: true }) landing_location;

  @belongsTo('ygg--acao--flight', { async: true }) towed_by;
  @belongsTo('ygg--acao--flight', { async: true }) towing;

  get duration() {
    return this.landing_time - this.takeoff_time;
  }
}
