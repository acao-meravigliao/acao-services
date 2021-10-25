import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoTokenTransactionModel extends Model {
  @attr('number') person_id;
  @attr('number') aircraft_id;
  @attr('date') recorded_at;
  @attr('string') descr;
  @attr('number') amount;
  @attr('number') prev_credit;
  @attr('number') credit;
  @attr('string') old_operator;
  @attr('string') old_marche_mezzo;

  aircraft: DS.belongsTo('ygg--acao--aircraft'),
}
