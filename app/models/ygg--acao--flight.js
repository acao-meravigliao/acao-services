import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

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

  @vosBelongsTo('flight', 'aircraft') aircraft;
  @vosBelongsTo('flight', 'pilot1') pilot1;
  @vosBelongsTo('flight', 'pilot2') pilot2;
  @vosBelongsTo('flight', 'takeoff_airfield') takeoff_airfield;
  @vosBelongsTo('flight', 'landing_airfield') landing_airfield;
  @vosBelongsTo('flight', 'takeoff_location') takeoff_location;
  @vosBelongsTo('flight', 'landing_location') landing_location;
  @vosBelongsTo('flight', 'towed_by') towed_by;
  @vosBelongsTo('flight', 'towing') towing;

  get duration() {
    return this.landing_time - this.takeoff_time;
  }
}
