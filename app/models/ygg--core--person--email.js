import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggCorePersonEmailModel extends Model {
  @attr('string') email;
  @attr('string') descr;

  @vosBelongsTo('email', 'ml_address') ml_address;
}
