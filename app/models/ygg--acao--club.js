import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoClubModel extends Model {
  @attr('string') name;
  @attr('string') airfield_id;

  @belongsTo('ygg--acao--airfield') airfield;
}
