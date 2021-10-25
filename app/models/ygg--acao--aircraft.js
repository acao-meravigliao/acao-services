import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoAircraftModel extends Model {
  @attr('string') registration;
  @attr('string') race_registration;
  @attr('string') flarm_identifier;
  @attr('string') icao_identifier;
  @attr('string') serial_number;
  @attr('boolean') hangar;
  @attr('date') arc_valid_to;
  @attr('date') insurance_valid_to;

  aircraft_type: DS.belongsTo('ygg--acao--aircraft-type'),
  club: DS.belongsTo('ygg--acao--club'),
  owner: DS.belongsTo('ygg--core--person'),
}
