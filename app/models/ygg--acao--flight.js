import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoFlightModel extends Model {
  @attr('string') aircraft_reg;
  @attr('number') aircraft_id;
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

  @belongsTo('ygg--acao--aircraft') aircraft;
  @belongsTo('ygg--core--person') pilot1;
  @belongsTo('ygg--core--person') pilot2;
  @belongsTo('ygg--acao--airfield') takeoff_airfield;
  @belongsTo('ygg--acao--airfield') landing_airfield;
  @belongsTo('ygg--core--location') takeoff_location;
  @belongsTo('ygg--core--location') landing_location;

  @belongsTo('ygg--acao--flight') towed_by;
  @belongsTo('ygg--acao--flight') towing;

  get duration() {
    return this.landing_time - this.takeoff_time;
  }
}
