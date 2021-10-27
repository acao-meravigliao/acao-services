import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoAirfieldModel extends Model {
  @attr('string') name;
  @attr('string') icao_code;
  @attr('string') symbol;

  @belongsTo('ygg--core--location') location;
}
