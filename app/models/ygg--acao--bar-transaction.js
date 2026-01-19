import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoBarTransactionModel extends VosModel {
  @attr('date') recorded_at;
  @attr('number') cnt;
  @attr('string') descr;
  @attr('decimal') amount;
  @attr('string') unit;
  @attr('decimal') prev_credit;
  @attr('decimal') credit;

  @vosBelongsTo('bar_transaction', 'member') member;
}
