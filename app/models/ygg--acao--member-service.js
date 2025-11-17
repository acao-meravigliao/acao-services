import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMemberServiceModel extends VosModel {
  @attr('date') valid_from;
  @attr('date') valid_to;
  @attr('string') service_data;

  @vosBelongsTo('service', 'member') member;
  @vosBelongsTo('service', 'service_type') service_type;
}
