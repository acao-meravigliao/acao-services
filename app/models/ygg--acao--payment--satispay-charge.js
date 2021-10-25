import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoPaymentSatispayChargeModel extends Model {
  payment: DS.belongsTo('ygg--acao--payment'),
}
