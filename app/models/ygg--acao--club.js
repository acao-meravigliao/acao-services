import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoClubModel extends Model {
  @attr('string') name;
  @attr('string') airfield_id;

  @vosBelongsTo('club', 'airfield') airfield;
}
