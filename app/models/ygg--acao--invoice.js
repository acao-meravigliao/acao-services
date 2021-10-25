import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoInvoiceModel extends Model {
  @attr('number') person_id;
  @attr('string') identifier;
  @attr('string') first_name;
  @attr('string') last_name;
  @attr('string') address;
  @attr('date') created_at;
  @attr('date') completed_at;
  @attr('string') state;
  @attr('string') payment_state;
  @attr('string') notes;
  @attr('string') payment_method;
  @attr('number') total;

  details: DS.hasMany('ygg--acao--invoice--detail'),
  person: DS.belongsTo('ygg--core--person'),
  payments: DS.hasMany('ygg--acao--payment'),
}
