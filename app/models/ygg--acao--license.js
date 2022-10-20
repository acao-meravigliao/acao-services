import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoLicenseModel extends Model {
  @attr('string') type;
  @attr('string') identifier;
  @attr('date') issued_at;
  @attr('date') valid_to;
  @attr('date') valid_to2;

  @belongsTo('ygg--core--person', { async: true }) pilot;
}
