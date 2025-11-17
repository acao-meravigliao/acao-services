import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoInvoiceModel extends VosModel {
  @attr('string') person_id;
  @attr('string') identifier;
  @attr('string') identifier_full;
  @attr('date') created_at;
  @attr('date') document_date;
  @attr('date') registered_at;
  @attr('string') recipient;
  @attr('string') address;
  @attr('string') partita_iva;
  @attr('string') codice_fiscale;
  @attr('string') email;
  @attr('string') state;
  @attr('string') payment_state;
  @attr('string') notes;
  @attr('string') payment_method;
  @attr('number') amount;

  @vosHasMany('invoice', 'detail') details;
  @vosBelongsTo('invoice', 'person') person;
  @vosBelongsTo('invoice', 'member') member;
  @vosHasMany('invoice', 'payment') payments;
  @vosBelongsTo('invoice', 'token_transaction') token_transaction;

  get sorted_details() {
    return this.details.sort((a,b) => (a.row_number - b.row_number));
  }
}
