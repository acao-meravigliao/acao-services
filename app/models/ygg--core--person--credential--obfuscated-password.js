import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggCorePersonCredentialObfuscatedPasswordModel extends Model {
  @attr('string') fqda;
  @attr('string') descr;
}
