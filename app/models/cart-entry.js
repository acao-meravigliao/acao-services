import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class CartEntryModel extends Model {
  @attr('number') count;
}
