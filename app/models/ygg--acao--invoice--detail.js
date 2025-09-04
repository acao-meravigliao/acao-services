import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoInvoiceDetailModel extends Model {
  @attr('string') invoice_id;
  @attr('string') service_type_id;
  @attr('number') price;
  @attr('string') descr;
  @attr('number') count;

  @attr('string', { key: 'data' }) specific_data;

  @vosBelongsTo('detail', 'invoice') invoice;
  @vosBelongsTo('detail', 'service_type') service_type;
}
