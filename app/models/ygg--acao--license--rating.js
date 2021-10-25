import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoLicenseRatingModel extends Model {
  @attr('string') type;
  @attr('date') issued_at;
  @attr('date') valid_to;

  license: DS.belongsTo('ygg--acao--license'),
}
