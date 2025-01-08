import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoTokenTransactionModel extends Model {
  @attr('string') member_id;
  @attr('string') aircraft_id;
  @attr('date') recorded_at;
  @attr('string') descr;
  @attr('number') amount;
  @attr('number') prev_credit;
  @attr('number') credit;
  @attr('string') old_operator;
  @attr('string') old_marche_mezzo;

//  @vosBelongsTo('token_transaction', 'aircraft') aircraft;

  @vosBelongsTo('token_transaction', 'member') member;
}
