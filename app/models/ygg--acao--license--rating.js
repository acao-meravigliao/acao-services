import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoLicenseRatingModel extends Model {
  @attr('string') type;
  @attr('date') issued_at;
  @attr('date') valid_to;

  @belongsTo('ygg--acao--license', { async: true }) license;
}
