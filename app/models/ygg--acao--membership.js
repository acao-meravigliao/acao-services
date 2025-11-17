import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMembershipModel extends VosModel {
  @attr('string') person_id;
  @attr('boolean') email_allowed;
  @attr('date') valid_from;
  @attr('date') valid_to;
  @attr('string') reference_year_id;
  @attr('string') invoice_detail_id;
  @attr('string') status;

  @vosBelongsTo('membership', 'member') member;
  @vosBelongsTo('membership', 'year') year;
}
