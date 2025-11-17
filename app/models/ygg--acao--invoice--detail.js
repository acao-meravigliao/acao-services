import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoInvoiceDetailModel extends VosModel {
  @attr('number') count;
  @attr('string') code;
  @attr('number') row_type;
  @attr('number') row_number;
  @attr('string') descr;
  @attr('number') single_amount;
  @attr('number') untaxed_amount;
  @attr('number') vat_amount;
  @attr('number') total_amount;

//  @attr('string', { key: 'data' }) specific_data;

  @vosBelongsTo('detail', 'invoice') invoice;
//  @vosBelongsTo('detail', 'service_type') service_type;
}
