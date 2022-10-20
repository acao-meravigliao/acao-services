import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoTokenTransactionModel extends Model {
  @attr('string') person_id;
  @attr('string') aircraft_id;
  @attr('date') recorded_at;
  @attr('string') descr;
  @attr('number') amount;
  @attr('number') prev_credit;
  @attr('number') credit;
  @attr('string') old_operator;
  @attr('string') old_marche_mezzo;

  @belongsTo('ygg--acao--aircraft', { async: true }) aircraft;
}
