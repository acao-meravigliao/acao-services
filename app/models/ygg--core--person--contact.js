import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggCorePersonContactModel extends Model {
  @attr('string') type;
  @attr('string') value;
  @attr('string') descr;
}
