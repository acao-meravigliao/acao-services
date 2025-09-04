import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoPaymentSatispayChargeModel extends Model {
  @vosBelongsTo('satispay_charge', 'payment') payment;
}
