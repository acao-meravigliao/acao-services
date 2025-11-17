import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoRoleModel extends VosModel {
  @attr('string') symbol;
  @attr('string') descr;
  @attr('string') icon;
  @attr('boolean') usable;

  @vosBelongsTo('payment', 'debt') debt;
}
