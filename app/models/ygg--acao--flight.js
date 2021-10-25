import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

import { computed } from '@ember/object';

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

  aircraft: DS.belongsTo('ygg--acao--aircraft'),
  pilot1: DS.belongsTo('ygg--core--person'),
  pilot2: DS.belongsTo('ygg--core--person'),
  takeoff_airfield: DS.belongsTo('ygg--acao--airfield'),
  landing_airfield: DS.belongsTo('ygg--acao--airfield'),
  takeoff_location: DS.belongsTo('ygg--core--location'),
  landing_location: DS.belongsTo('ygg--core--location'),

  towed_by: DS.belongsTo('ygg--acao--flight', { inverse: 'towing' }),
  towing: DS.belongsTo('ygg--acao--flight', { inverse: 'towed_by' }),

  duration: computed('takeoff_time,landing_time', function() { return this.landing_time - this.takeoff_time; }),
}
