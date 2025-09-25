import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAircraftSyncStatusModel extends Model {
  @attr('string') symbol;
  @attr('string') status;
  @attr('date') last_update;
}
