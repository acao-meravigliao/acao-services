import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoYearModel extends Model {
  @attr('number') year;
  @attr('date') renew_opening_time;
  @attr('date') renew_announce_time;
}
