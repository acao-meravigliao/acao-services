import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoPaymentSatispayChargeModel extends Model {
  @belongsTo('ygg--acao--payment') payment;
}
