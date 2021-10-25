import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoLicenseModel extends Model {
  @attr('string') type;
  @attr('string') identifier;
  @attr('date') issued_at;
  @attr('date') valid_to;
  @attr('date') valid_to2;

  pilot: DS.belongsTo('ygg--core--person'),
}
