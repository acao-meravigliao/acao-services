import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoMedicalModel extends Model {
  @attr('number') pilot_id;
  @attr('string') type;
  @attr('string') identifier;
  @attr('date') issued_at;
  @attr('date') valid_to;

  pilot: DS.belongsTo('ygg--core--person'),
}
