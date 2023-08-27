import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoPaymentSatispayChargeModel extends Model {
  @belongsTo('ygg--acao--payment', { async: true }) payment;
}
