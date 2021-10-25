import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoAirfieldModel extends Model {
  @attr('string') name;
  @attr('string') icao_code;
  @attr('string') symbol;

  location: DS.belongsTo('ygg--core--location'),
}
