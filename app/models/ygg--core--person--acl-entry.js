import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

export default class YggCorePersonAclEntryModel extends Model {
  @attr('string') capability;
}
