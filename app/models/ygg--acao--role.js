import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoRoleModel extends Model {
  @attr('string') symbol;
  @attr('string') descr;
  @attr('string') icon;
  @attr('boolean') usable;

  @vosBelongsTo('payment', 'debt') debt;
}
