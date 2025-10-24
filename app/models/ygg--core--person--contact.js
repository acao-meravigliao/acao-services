import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggCorePersonContactModel extends Model {
  @attr('string') type;
  @attr('string') value;
  @attr('string') descr;

  get is_valid() {
    switch(this.type) {
    case 'phone':
    case 'mobile':
      return this.value.trim().match(/^[\+]?[-0-9() ]+$/im);
    default:
      return true;
    }
  }
}
