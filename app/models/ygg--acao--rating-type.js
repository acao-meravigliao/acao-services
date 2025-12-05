import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoRoleModel extends VosModel {
  @attr('string') symbol;
  @attr('string') name;

  @vosHasMany('rating_type', 'ratings') ratings;
}
