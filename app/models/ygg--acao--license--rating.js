import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoLicenseRatingModel extends Model {
  @attr('string') type;
  @attr('date') issued_at;
  @attr('date') valid_to;

  @vosBelongsTo('rating', 'license') license;
}
