import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoTowRosterEntryModel extends Model {
  @attr('string') notes;
  @attr('date') selected_at;
}
