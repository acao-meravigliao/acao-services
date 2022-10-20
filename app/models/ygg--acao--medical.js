import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoMedicalModel extends Model {
  @attr('string') pilot_id;
  @attr('string') type;
  @attr('string') identifier;
  @attr('date') issued_at;
  @attr('date') valid_to;

  @belongsTo('ygg--core--person', { async: true }) pilot;
}
