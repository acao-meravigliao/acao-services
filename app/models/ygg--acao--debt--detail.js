import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoDebtDetailModel extends VosModel {
  @attr('number') row_index;
  @attr('number') count;
  @attr('string') code;
  @attr('string') descr;
  @attr('number') vat;
  @attr('number') amount;

  @vosBelongsTo('detail', 'debt') debt;

  get total() {
    return this.count * (this.amount + this.amount * this.vat);
  }
}
