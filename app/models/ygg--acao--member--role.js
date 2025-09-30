import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMemberRoleModel extends Model {

  @attr('string') symbol;
  @attr('string') name;

  @vosBelongsTo('role', 'member') member;
}
