import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggCorePersonAclEntryModel extends Model {
  @attr('string') capability;
}
