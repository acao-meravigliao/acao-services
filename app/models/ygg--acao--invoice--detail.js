import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoInvoiceDetailModel extends Model {
  @attr('string') invoice_id;
  @attr('string') service_type_id;
  @attr('number') price;
  @attr('string') descr;
  @attr('number') count;

  @attr('string', { key: 'data' }) specific_data;

  @belongsTo('ygg--acao--invoice', { async: true }) invoice;
  @belongsTo('ygg--acao--service-type', { async: true }) service_type;
}
