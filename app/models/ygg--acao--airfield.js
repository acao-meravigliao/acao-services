import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAirfieldModel extends Model {
  @attr('string') name;
  @attr('string') icao_code;
  @attr('string') symbol;

  @vosBelongsTo('airfield', 'location') location;
}
