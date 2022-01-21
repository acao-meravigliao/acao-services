import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class CartEntryModel extends Model {
  @attr('number') count;

  @belongsTo('ygg--acao--service-type') service;
}
