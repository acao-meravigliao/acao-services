import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoBarTransactionModel extends VosModel {
  @attr('date') recorded_at;
  @attr('number') cnt;
  @attr('string') descr;
  @attr('number') amount;
  @attr('string') unit;
  @attr('number') prev_credit;
  @attr('number') credit;

  @vosBelongsTo('bar_transaction', 'member') member;
}
