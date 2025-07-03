import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMedicalModel extends Model {
  @attr('string') pilot_id;
  @attr('string') type;
  @attr('string') identifier;
  @attr('date') issued_at;
  @attr('date') valid_to;

  @vosBelongsTo('pilot', 'medical') pilot;
}
