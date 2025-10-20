import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoDebtDetailModel extends Model {
  @attr('number') row_index;
  @attr('number') count;
  @attr('string') code;
  @attr('string') descr;
  @attr('number') vat;
  @attr('number') amount;

  @vosBelongsTo('detail', 'debt') debt;
}
