import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoInvoiceDetailModel extends Model {
  @attr('number') invoice_id;
  @attr('number') service_type_id;
  @attr('number') price;
  @attr('string') descr;
  @attr('number') count;

  specific_data: DS.attr('string', { key: 'data' }),

  invoice: DS.belongsTo('ygg--acao--invoice'),
  service_type: DS.belongsTo('ygg--acao--service-type'),
}
