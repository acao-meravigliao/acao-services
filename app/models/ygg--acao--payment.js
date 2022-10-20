import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoPaymentModel extends Model {
  @attr('string') identifier;
  @attr('date') created_at;
  @attr('date') expires_at;
  @attr('date') completed_at;
  @attr('string') state;
  @attr('number') amount;
  @attr('string') person_id;
  @attr('string') payment_method;
  @attr('string') reason_for_payment;

  @belongsTo('ygg--core--person', { async: true }) person;
  @belongsTo('ygg--acao--invoice', { async: true }) invoice;
}
