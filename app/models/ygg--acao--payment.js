import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

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
  @attr('string') obj_type;

  @attr('string') sp_status;
  @attr('string') sp_expired;
  @attr('string') sp_sender_type;
  @attr('string') sp_sender_name;

  @vosBelongsTo('payment', 'person') person;
  @vosHasMany('payment', 'invoice') invoice;
}
