import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';
import { tracked } from '@glimmer/tracking';

export default class YggAcaoFlightModel extends Model {
  @attr('number') source_id;

  @attr('string') aircraft_reg;
  @attr('string') aircraft_id;
  @attr('string') aircraft_class;

  @attr('date') takeoff_time;
  @attr('string') takeoff_location_raw;
  @attr('date') landing_time;
  @attr('string') landing_location_raw;

  @attr('boolean') instruction_flight;
  @attr('string') launch_type;
  @attr('number') acao_quota;
  @attr('number') acao_bollini_volo;

  @attr('string') pilot1_role;
  @attr('string') pilot1_name;
  @attr('string') pilot2_role;
  @attr('string') pilot2_name;

  @vosBelongsTo('flight', 'aircraft') aircraft;
  @vosBelongsTo('flight', 'pilot1') pilot1;
  @vosBelongsTo('flight', 'pilot2') pilot2;
  @vosBelongsTo('flight', 'takeoff_airfield') takeoff_airfield;
  @vosBelongsTo('flight', 'landing_airfield') landing_airfield;
  @vosBelongsTo('flight', 'takeoff_location') takeoff_location;
  @vosBelongsTo('flight', 'landing_location') landing_location;
  @vosBelongsTo('towing', 'towed_by') towed_by;
  @vosBelongsTo('towed_by', 'towing') towing;
  @vosHasMany('flight', 'token_transaction') token_transactions;

  @tracked selected = true;

  get duration() {
    return this.landing_time - this.takeoff_time;
  }

  role(as) {
    if (as == this.pilot1)
      return this.pilot1_role;
    else if (as == this.pilot2)
      return this.pilot2_role;
    else
      return null;
  }
}
