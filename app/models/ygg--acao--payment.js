import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

import { mapBy, sum } from '@ember/object/computed';

export default class YggAcaoPaymentModel extends Model {
  @attr('string') identifier;
  @attr('date') created_at;
  @attr('date') expires_at;
  @attr('date') completed_at;
  @attr('string') state;
  @attr('number') amount;
  @attr('number') person_id;
  @attr('string') payment_method;
  @attr('string') reason_for_payment;

  person: DS.belongsTo('ygg--core--person'),
  invoice: DS.belongsTo('ygg--acao--invoice'),
}
