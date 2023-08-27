import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoInvoiceModel extends Model {
  @attr('string') person_id;
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

  @hasMany('ygg--acao--invoice--detail', { async: true }) details;
  @belongsTo('ygg--core--person', { async: true }) person;
  @hasMany('ygg--acao--payment', { async: true }) payments;
}
