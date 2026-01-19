import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';
import Decimal from 'decimal.js';

export default class YggAcaoDebtDetailModel extends VosModel {
  @attr('number') row_index;
  @attr('number') count;
  @attr('string') code;
  @attr('string') descr;
  @attr('decimal') vat;
  @attr('decimal') amount;

  @vosBelongsTo('detail', 'debt') debt;

  get total() {
    return (new Decimal(this.count)).times(this.amount.plus(this.amount.times(this.vat)));
  }
}
