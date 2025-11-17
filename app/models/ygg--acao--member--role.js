import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMemberRoleModel extends VosModel {
  @attr('string') symbol;
  @attr('string') name;
  @attr('date') valid_from;
  @attr('date') valid_to;

  @vosBelongsTo('role', 'member') member;
}
