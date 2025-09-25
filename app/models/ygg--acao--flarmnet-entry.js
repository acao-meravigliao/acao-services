import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoFlarmentEntryModel extends Model {
  @attr('string') device_type;
  @attr('string') device_id;
  @attr('string') aircraft_model;
  @attr('string') registration;
  @attr('string') cn;
  @attr('boolean') tracked;
  @attr('boolean') identified;
  @attr('date') last_update;

}
